import { describe, expect, test } from 'vitest';
import { availabilityReason } from './availability';
import {
  explainAvailability,
  mockAdapter,
  type ExplanationInput,
} from './explain';
import { canBook } from './booking';

const availableInput: ExplanationInput = {
  roomLabel: 'Athena Hall',
  start: '10:00',
  end: '11:00',
  isAvailable: true,
  reasonCode: 'available',
};

describe('explainAvailability', () => {
  test('E1 available: mock explains a deterministic available result', async () => {
    const request = {
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    };
    const isAvailable = canBook(request);
    const input = {
      ...availableInput,
      isAvailable,
      reasonCode: availabilityReason(request),
    };
    const result = await explainAvailability(input, mockAdapter);

    expect(isAvailable).toBe(true);
    expect(result.source).toBe('adapter');
    expect(result.explanation).toContain('available');
  });

  test('E2 overlap: mock explanation agrees with an unavailable result', async () => {
    const request = {
      start: 630,
      end: 690,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    };
    const isAvailable = canBook(request);
    const result = await explainAvailability(
      {
        ...availableInput,
        isAvailable,
        reasonCode: availabilityReason(request),
      },
      mockAdapter,
    );

    expect(isAvailable).toBe(false);
    expect(result.explanation).toContain('overlaps');
  });

  test('E3 blocked room: mock explanation names the deterministic reason', async () => {
    const request = {
      start: 660,
      end: 720,
      now: 540,
      blocked: true,
      bookings: [],
    };
    const isAvailable = canBook(request);
    const result = await explainAvailability(
      {
        ...availableInput,
        isAvailable,
        reasonCode: availabilityReason(request),
      },
      mockAdapter,
    );

    expect(isAvailable).toBe(false);
    expect(result.explanation).toContain('blocked');
  });

  test('E4 invalid time reason: deterministic checker maps invalid intervals', () => {
    expect(
      availabilityReason({
        start: 700,
        end: 600,
        now: 500,
        blocked: false,
        bookings: [],
      }),
    ).toBe('invalid_time');
  });

  test('E5 past time reason: deterministic checker maps past intervals', () => {
    expect(
      availabilityReason({
        start: 490,
        end: 510,
        now: 500,
        blocked: false,
        bookings: [],
      }),
    ).toBe('past_time');
  });

  test('deterministic checker maps bookings longer than 120 minutes', () => {
    expect(
      availabilityReason({
        start: 600,
        end: 721,
        now: 500,
        blocked: false,
        bookings: [],
      }),
    ).toBe('too_long');
  });

  test('E6 empty room name is rejected before calling the adapter', async () => {
    let adapterCalled = false;
    const adapter = () => {
      adapterCalled = true;
      return { explanation: 'This requested time is available.' };
    };

    await expect(
      explainAvailability({ ...availableInput, roomLabel: '  ' }, adapter),
    ).rejects.toThrow('Room name');
    expect(adapterCalled).toBe(false);
  });

  test('E7 room names longer than 60 characters are rejected', async () => {
    await expect(
      explainAvailability({ ...availableInput, roomLabel: 'r'.repeat(500) }),
    ).rejects.toThrow('1–60');
  });

  test('E8 a hanging adapter times out to a safe fallback', async () => {
    const result = await explainAvailability(
      { ...availableInput, isAvailable: false, reasonCode: 'overlap' },
      () => new Promise<never>(() => {}),
      5,
    );

    expect(result.source).toBe('fallback');
    expect(result.explanation).toContain('overlaps');
  });

  test('E9 a failing adapter uses a fallback without changing availability', async () => {
    const result = await explainAvailability(availableInput, () => {
      throw new Error('simulated adapter failure');
    });

    expect(result).toEqual({
      explanation: 'This requested time is available.',
      source: 'fallback',
    });
    expect(availableInput.isAvailable).toBe(true);
  });

  test('rejects output that contradicts the deterministic decision', async () => {
    const result = await explainAvailability(availableInput, () => ({
      explanation: 'This requested time is unavailable because it overlaps a booking.',
    }));

    expect(result.source).toBe('fallback');
    expect(result.explanation).toBe('This requested time is available.');
  });

  test('an adapter cannot mutate the decision used for output validation or fallback', async () => {
    const overlapInput: ExplanationInput = {
      ...availableInput,
      isAvailable: false,
      reasonCode: 'overlap',
    };
    const result = await explainAvailability(overlapInput, (input) => {
      input.isAvailable = true;
      input.reasonCode = 'available';
      return { explanation: 'This requested time is available.' };
    });

    expect(result.source).toBe('fallback');
    expect(result.explanation).toContain('overlaps');
    expect(overlapInput.reasonCode).toBe('overlap');
  });

  test('rejects output that invents a time or booking details', async () => {
    const result = await explainAvailability(availableInput, () => ({
      explanation: 'This requested time is available at 15:00 for Professor Lee.',
    }));

    expect(result.source).toBe('fallback');
  });

  test('rejects malformed, empty, long, or overly detailed output', async () => {
    for (const output of [
      null,
      {},
      { explanation: '   ' },
      { explanation: 'x'.repeat(281) },
      { explanation: 'Available. Also this is a third sentence. Really.' },
    ]) {
      const result = await explainAvailability(availableInput, () => output);
      expect(result.source).toBe('fallback');
    }
  });

  test('rejects disagreement between isAvailable and reasonCode', async () => {
    await expect(
      explainAvailability({
        ...availableInput,
        isAvailable: false,
      }),
    ).rejects.toThrow('agree');
  });

test('V1 F2: contradictory explanation must use fallback', async () => {
  const result = await explainAvailability(
    {
      ...availableInput,
      isAvailable: false,
      reasonCode: 'overlap',
    },
    () => ({
      explanation:
        'This requested time is not unavailable because it overlaps an existing booking.',
    }),
  );

  expect(result.source).toBe('fallback');
  expect(result.explanation).toContain('unavailable');
});

test('V2 F3: valid end-of-day time 24:00 is accepted', async () => {
  const result = await explainAvailability(
    {
      ...availableInput,
      start: '23:00',
      end: '24:00',
    },
    mockAdapter,
  );

  expect(result.source).toBe('adapter');
  expect(result.explanation).toContain('available');
});

});
