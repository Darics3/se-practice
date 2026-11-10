import { describe, expect, test } from 'vitest';
import { checkRoom } from './booking';
import { filterRooms } from './filter';
import type { Room } from './rooms';

const TEST_ROOMS: Room[] = [
  {
    id: 'a',
    name: 'Open Room',
    capacity: 20,
    equipment: ['projector', 'whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'b',
    name: 'Blocked Room',
    capacity: 20,
    equipment: ['projector', 'whiteboard'],
    blocked: true,
    bookings: [],
  },
  {
    id: 'c',
    name: 'Free Room',
    capacity: 10,
    equipment: ['projector'],
    blocked: false,
    bookings: [],
  },
];

describe('checkRoom', () => {
  test('F3: blocked room is never available', () => {
    expect(
      checkRoom(TEST_ROOMS, 'b', {
        start: 720,
        end: 780,
        now: 540,
      }),
    ).toBe(false);
  });

  test('F5: selected room uses its own bookings', () => {
    expect(
      checkRoom(TEST_ROOMS, 'a', {
        start: 630,
        end: 690,
        now: 540,
      }),
    ).toBe(false);

    expect(
      checkRoom(TEST_ROOMS, 'c', {
        start: 630,
        end: 690,
        now: 540,
      }),
    ).toBe(true);
  });

  test('INT: filterRooms result can be checked with checkRoom', () => {
    const filtered = filterRooms(TEST_ROOMS, {
      attendees: 10,
      equipment: ['projector'],
    });

    const room = filtered.find((item) => item.id === 'c');

    expect(room).toBeDefined();

    expect(
      checkRoom(filtered, 'c', {
        start: 720,
        end: 780,
        now: 540,
      }),
    ).toBe(true);
  });
});