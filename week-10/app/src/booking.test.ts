import { describe, expect, test } from 'vitest';
import { canBook, type ExistingBooking } from './booking';

const NOW = 540;

function freshBookings(): ExistingBooking[] {
  return [{ start: 600, end: 660 }];
}

describe('canBook', () => {
  test('T01 AC4: touching after an existing booking is allowed', () => {
    expect(
      canBook({
        start: 660,
        end: 720,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(true);
  });
   test('BUG-A: request touching bookings on both sides is allowed', () => {
    const bookings = [
      { start: 600, end: 660 },
      { start: 720, end: 780 },
    ];

    expect(
      canBook({
        start: 660,
        end: 720,
        now: NOW,
        blocked: false,
        bookings,
      }),
    ).toBe(true);
  });
  test('BUG-B: available check does not mutate bookings', () => {
  const bookings = [
    { start: 600, end: 660 },
    { start: 900, end: 960 },
  ];

  const before = bookings.map((booking) => ({ ...booking }));

  expect(
    canBook({
      start: 720,
      end: 780,
      now: NOW,
      blocked: false,
      bookings,
    }),
  ).toBe(true);

  expect(bookings).toEqual(before);
});


  test('T02 AC1: starting exactly at now is rejected', () => {
    expect(
      canBook({
        start: 540,
        end: 570,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T03 AC1: zero-duration interval is rejected', () => {
    expect(
      canBook({
        start: 720,
        end: 720,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T04 AC1: reversed interval is rejected', () => {
    expect(
      canBook({
        start: 750,
        end: 720,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T05 AC1: interval ending after 1440 is rejected', () => {
    expect(
      canBook({
        start: 1380,
        end: 1441,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T06 AC2: exactly 120 minutes is allowed', () => {
    expect(
      canBook({
        start: 720,
        end: 840,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(true);
  });

  test('T07 AC2: 121 minutes is rejected', () => {
    expect(
      canBook({
        start: 720,
        end: 841,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T08 AC4: touching before an existing booking is allowed', () => {
    expect(
      canBook({
        start: 570,
        end: 600,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(true);
  });

  test('T09 AC4: partial overlap is rejected', () => {
    expect(
      canBook({
        start: 630,
        end: 690,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T10 AC4: interval containing an existing booking is rejected', () => {
    expect(
      canBook({
        start: 570,
        end: 690,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T11 AC4: interval inside an existing booking is rejected', () => {
    expect(
      canBook({
        start: 615,
        end: 645,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T12 AC4: identical interval is rejected', () => {
    expect(
      canBook({
        start: 600,
        end: 660,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T13 AC3: blocked room is rejected', () => {
    expect(
      canBook({
        start: 660,
        end: 720,
        now: NOW,
        blocked: true,
        bookings: freshBookings(),
      }),
    ).toBe(false);
  });

  test('T14 AC4: overlapping time is allowed when there are no bookings', () => {
    expect(
      canBook({
        start: 630,
        end: 690,
        now: NOW,
        blocked: false,
        bookings: [],
      }),
    ).toBe(true);
  });

  test('AC5: available check does not change existing bookings', () => {
    const bookings = freshBookings();
    const before = structuredClone(bookings);

    expect(
      canBook({
        start: 660,
        end: 720,
        now: NOW,
        blocked: false,
        bookings,
      }),
    ).toBe(true);

    expect(bookings).toEqual(before);
  });

  test('X1 AC1 AC4: one minute after now and touching booking is allowed', () => {
    expect(
      canBook({
        start: 541,
        end: 600,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(true);
  });

  test('X2 AC1: interval ending exactly at 1440 is allowed', () => {
    expect(
      canBook({
        start: 1380,
        end: 1440,
        now: NOW,
        blocked: false,
        bookings: freshBookings(),
      }),
    ).toBe(true);
  });
});