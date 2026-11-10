import { describe, expect, test } from 'vitest';
import { filterRooms } from './filter';
import type { Room } from './rooms';

const TEST_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'Alpha Room',
    capacity: 8,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'r2',
    name: 'Beta Room',
    capacity: 12,
    equipment: ['projector'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'r3',
    name: 'Gamma Room',
    capacity: 20,
    equipment: ['projector', 'whiteboard', 'microphone'],
    blocked: true,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'r4',
    name: 'Delta Room',
    capacity: 6,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [],
  },
];

describe('filterRooms', () => {
  test('F1: capacity must be greater than or equal to attendees', () => {
    const result = filterRooms(TEST_ROOMS, {
      attendees: 10,
      equipment: [],
    });

    expect(result.map((room) => room.id)).toEqual(['r2', 'r3']);
  });

  test('F2: room must contain ALL selected equipment', () => {
    const result = filterRooms(TEST_ROOMS, {
      attendees: 1,
      equipment: ['projector', 'whiteboard'],
    });

    expect(result.map((room) => room.id)).toEqual(['r1', 'r3']);
  });

  test('F4: no matching rooms returns an empty list', () => {
    const result = filterRooms(TEST_ROOMS, {
      attendees: 100,
      equipment: [],
    });

    expect(result).toEqual([]);
  });

  test('B5: capacity exactly equal to attendees is included', () => {
    const result = filterRooms(TEST_ROOMS, {
      attendees: 8,
      equipment: [],
    });

    expect(result.some((room) => room.id === 'r1')).toBe(true);
  });

  test('B6: capacity one below attendees is excluded', () => {
    const result = filterRooms(TEST_ROOMS, {
      attendees: 9,
      equipment: [],
    });

    expect(result.some((room) => room.id === 'r1')).toBe(false);
  });
});