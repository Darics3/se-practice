import type { Room, Booking, CheckResult } from './types';

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

export function overlapsExisting(start: number, end: number, existing: Booking[]): Booking | null {
  return existing.find((b) => start < b.end && b.start < end) ?? null;
}

export function checkAvailability(
  startMin: number,
  endMin: number,
  room: Room | undefined,
  roomBookings: Booking[],
  currentTime: number,
): CheckResult {
  // AC1: interval must satisfy 0 ≤ start < end ≤ 1440 and start > currentTime
  if (startMin < 0 || endMin > 1440) {
    return { available: false, reason: 'Time must be within 00:00–24:00.' };
  }
  if (startMin >= endMin) {
    return { available: false, reason: 'Start time must be before end time.' };
  }
  if (startMin < currentTime) {
    return { available: false, reason: 'Start time must be after the current time.' };
  }

  // AC2: reject booking longer than 120 minutes
  if (endMin - startMin > 120) {
    return { available: false, reason: 'Bookings cannot be longer than 120 minutes.' };
  }

  // AC3: reject if room is blocked
  if (!room) {
    return { available: false, reason: 'Please select a room.' };
  }
  if (room.blocked) {
    return { available: false, reason: `${room.name} is blocked — ${room.blockedReason ?? 'unavailable'}.` };
  }

  // AC4: reject overlapping intervals (touching endpoints allowed)
  const conflict = overlapsExisting(startMin, endMin, roomBookings);
  if (conflict) {
    return {
      available: false,
      reason: `Overlaps "${conflict.title}" (${minutesToTime(conflict.start)}–${minutesToTime(conflict.end)}).`,
    };
  }

  // AC5: decision only — data is not modified
  return { available: true };
}
