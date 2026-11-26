export type TimeSlot = {
  start: number;
  end: number;
};

export type AvailabilityCode =
  | 'available'
  | 'non-finite'
  | 'out-of-range'
  | 'invalid-order'
  | 'past'
  | 'too-long'
  | 'blocked'
  | 'overlap';

export type AvailabilityDecision =
  | { available: true; code: 'available' }
  | { available: false; code: Exclude<AvailabilityCode, 'available'>; conflictIndex?: number };

export type ExplanationReasonCode =
  | 'available'
  | 'invalid_time'
  | 'past_time'
  | 'too_long'
  | 'room_blocked'
  | 'overlap';

export function availabilityReason({
  start,
  end,
  now,
  blocked,
  bookings,
}: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: TimeSlot[];
}): ExplanationReasonCode {
  const decision = evaluateAvailability({ start, end, now, blocked, bookings });

  if (decision.available) return 'available';

  switch (decision.code) {
    case 'non-finite':
    case 'out-of-range':
    case 'invalid-order':
      return 'invalid_time';
    case 'past':
      return 'past_time';
    case 'too-long':
      return 'too_long';
    case 'blocked':
      return 'room_blocked';
    case 'overlap':
      return 'overlap';
  }
}

export function evaluateAvailability({
  start,
  end,
  now,
  blocked,
  bookings,
}: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: TimeSlot[];
}): AvailabilityDecision {
  if (![start, end, now].every(Number.isFinite)) {
    return { available: false, code: 'non-finite' };
  }

  if (start < 0 || end > 1440) {
    return { available: false, code: 'out-of-range' };
  }

  if (start >= end) {
    return { available: false, code: 'invalid-order' };
  }

  if (start <= now) {
    return { available: false, code: 'past' };
  }

  if (end - start > 120) {
    return { available: false, code: 'too-long' };
  }

  if (blocked) {
    return { available: false, code: 'blocked' };
  }

  const conflictIndex = bookings.findIndex(
    (booking) => start < booking.end && end > booking.start,
  );

  if (conflictIndex !== -1) {
    return { available: false, code: 'overlap', conflictIndex };
  }

  return { available: true, code: 'available' };
}