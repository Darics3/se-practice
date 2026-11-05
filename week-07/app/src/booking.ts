export type ExistingBooking = {
  start: number;
  end: number;
};

type CanBookInput = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: ExistingBooking[];
};

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: CanBookInput): boolean {
  // AC1
  if (!(0 <= start && start < end && end <= 1440)) {
    return false;
  }

  if (start <= now) {
    return false;
  }

  // AC2
  if (end - start > 120) {
    return false;
  }

  // AC3
  if (blocked) {
    return false;
  }

  // AC4
  for (const booking of bookings) {
    if (start < booking.end && booking.start < end) {
      return false;
    }
  }

  return true;
}