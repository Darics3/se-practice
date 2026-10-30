def can_book(start, end, now, blocked, existing):
    # AC1: Requested interval must be valid and start in the future.
    if not (0 <= start < end <= 1440):
        return False

    if start <= now:
        return False

    # AC2: Booking duration must be at most 120 minutes.
    if end - start > 120:
        return False

    # AC3: A blocked room cannot be booked.
    if blocked:
        return False

    # AC4: Requested interval must not overlap any existing booking.
    # Intervals are [start, end), so touching endpoints are allowed.
    for existing_start, existing_end in existing:
        if start < existing_end and end > existing_start:
            return False

    # AC5: True only if AC1-AC4 all passed.
    return True