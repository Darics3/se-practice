import type { Room, Booking, CheckResult } from './types';
import { evaluateAvailability } from './availability';

export function timeToMinutes(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;

  const h = Number(match[1]);
  const m = Number(match[2]);

  if (h < 0 || h > 23 || m < 0 || m > 59) return null;

  return h * 60 + m;
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;

  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;

  return `${h} hr ${m} min`;
}

export function overlapsExisting(
  start: number,
  end: number,
  existing: Booking[],
): Booking | null {
  return existing.find((b) => start < b.end && b.start < end) ?? null;
}

export function checkAvailability(
  startMin: number,
  endMin: number,
  room: Room | undefined,
  roomBookings: Booking[],
  currentTime: number,
): CheckResult {
  if (!room) {
    return {
      available: false,
      reason: 'Please select a room.',
    };
  }

  const decision = evaluateAvailability({
    start: startMin,
    end: endMin,
    now: currentTime,
    blocked: room.blocked,
    bookings: roomBookings,
  });

  if (decision.available) {
    return { available: true };
  }

  switch (decision.code) {
    case 'non-finite':
      return {
        available: false,
        reason: 'Please enter valid times in HH:MM format.',
      };

    case 'out-of-range':
      return {
        available: false,
        reason: 'Time must be within 00:00–24:00.',
      };

    case 'invalid-order':
      return {
        available: false,
        reason: 'Start time must be before end time.',
      };

    case 'past':
      return {
        available: false,
        reason: 'Start time must be after the current time.',
      };

    case 'too-long':
      return {
        available: false,
        reason: 'Bookings cannot be longer than 120 minutes.',
      };

    case 'blocked':
      return {
        available: false,
        reason: `${room.name} is blocked — ${
          room.blockedReason ?? 'unavailable'
        }.`,
      };

    case 'overlap': {
      const conflict =
        decision.conflictIndex === undefined
          ? undefined
          : roomBookings[decision.conflictIndex];

      if (conflict) {
        return {
          available: false,
          reason: `Overlaps "${conflict.title}" (${minutesToTime(
            conflict.start,
          )}–${minutesToTime(conflict.end)}).`,
        };
      }

      return {
        available: false,
        reason: 'The requested time overlaps an existing booking.',
      };
    }

    default:
      return {
        available: false,
        reason: 'Unavailable.',
      };
  }
}