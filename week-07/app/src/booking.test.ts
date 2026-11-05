import { describe, expect, it } from 'vitest';
import { canBook, type ExistingBooking } from './canBook';

// Place this test beside the production canBook module imported by the page.
// If the module has a different filename, change ONLY the import path above.

const NOW = 540; // 09:00, fixed for every test

function freshBookings(): ExistingBooking[] {
  return [{ start: 600, end: 660 }]; // 10:00–11:00
}

type Case = {
  id: string;
  ac: string;
  start: number;
  end: number;
  expected: boolean;
  blocked?: boolean;
  emptyBookings?: boolean;
};

const cases: Case[] = [
  { id: 'T01', ac: 'AC4', start: 660, end: 720, expected: true },
  { id: 'T02', ac: 'AC1', start: 540, end: 570, expected: false },
  { id: 'T03', ac: 'AC1', start: 720, end: 720, expected: false },
  { id: 'T04', ac: 'AC1', start: 750, end: 720, expected: false },
  { id: 'T05', ac: 'AC1', start: 1380, end: 1441, expected: false },
  { id: 'T06', ac: 'AC2', start: 720, end: 840, expected: true },
  { id: 'T07', ac: 'AC2', start: 720, end: 841, expected: false },
  { id: 'T08', ac: 'AC4', start: 570, end: 600, expected: true },
  { id: 'T09', ac: 'AC4', start: 630, end: 690, expected: false },
  { id: 'T10', ac: 'AC4', start: 570, end: 690, expected: false },
  { id: 'T11', ac: 'AC4', start: 615, end: 645, expected: false },
  { id: 'T12', ac: 'AC4', start: 600, end: 660, expected: false },
  { id: 'T13', ac: 'AC3', start: 660, end: 720, blocked: true, expected: false },
  { id: 'T14', ac: 'AC4', start: 630, end: 690, emptyBookings: true, expected: true },
  { id: 'X1', ac: 'AC1/AC4', start: 541, end: 600, expected: true },
  { id: 'X2', ac: 'AC1', start: 1380, end: 1440, expected: true },
];

describe('canBook — reviewed AC1–AC5 cases', () => {
  it.each(cases)('$id [$ac]: returns $expected', ({
    start,
    end,
    expected,
    blocked = false,
    emptyBookings = false,
  }) => {
    // Each test constructs its own array and booking objects.
    const bookings = emptyBookings ? [] : freshBookings();
    const before = bookings.map((booking) => ({ ...booking }));
    const originalReferences = [...bookings];

    const decision = canBook({
      start,
      end,
      now: NOW,
      blocked,
      bookings,
    });

    expect(decision).toBe(expected);
    expect(bookings).toStrictEqual(before);
    bookings.forEach((booking, index) => {
      expect(booking).toBe(originalReferences[index]);
    });
  });

  it.each([
    { label: 'available', start: 660, end: 720, expected: true },
    { label: 'unavailable', start: 630, end: 690, expected: false },
  ])('AC5: $label check does not mutate existing bookings', ({
    start,
    end,
    expected,
  }) => {
    const bookings: ExistingBooking[] = [
      { start: 600, end: 660 },
      { start: 900, end: 960 },
    ];
    const before = bookings.map((booking) => ({ ...booking }));
    const originalReferences = [...bookings];

    expect(
      canBook({ start, end, now: NOW, blocked: false, bookings }),
    ).toBe(expected);
    expect(bookings).toStrictEqual(before);
    bookings.forEach((booking, index) => {
      expect(booking).toBe(originalReferences[index]);
    });
  });
});
