# Acceptance criteria — three selected stories

## Assumptions

- **Overlap:** a booking that starts exactly when another booking ends is allowed under R3 because the bookings do not occupy the room at the same time.
- **Duration:** a booking of exactly two hours is allowed under R2 because two hours is the maximum permitted duration.
- A Student can cancel only a booking they made.
- Confirmation is produced only after a booking or cancellation is successfully completed.

---

## US-02 — Book room

### AC-01
- **Given** the room is not blocked, the requested time is in the future, the duration is no more than two hours, and no existing booking overlaps it
- **When** the Student submits the booking
- **Then** the system creates the booking for the selected room and time slot.

### AC-02
- **Given** the requested booking starts at the current time or in the past
- **When** the Student submits the booking
- **Then** the system rejects the booking because it must start in the future.

### AC-03
- **Given** the requested booking lasts longer than two hours
- **When** the Student submits the booking
- **Then** the system rejects the booking because it exceeds the maximum duration.

### AC-04
- **Given** an existing booking for the same room overlaps any part of the requested time slot
- **When** the Student submits the booking
- **Then** the system rejects the booking because the room is unavailable for that time.

### AC-05
- **Given** the selected room is blocked
- **When** the Student submits a booking for that room
- **Then** the system rejects the booking because a blocked room cannot be booked.

---

## US-04 — Block or unblock room

### AC-06
- **Given** a room is currently unblocked
- **When** the Administrator blocks the room
- **Then** the room becomes blocked and cannot accept new bookings.

### AC-07
- **Given** a room is currently blocked
- **When** the Administrator unblocks the room
- **Then** the room becomes available for valid future bookings subject to R1–R3.

### AC-08
- **Given** a room is blocked
- **When** a Student attempts to create a booking for that room
- **Then** the system rejects the booking because the room is unavailable.

---

## US-06 — Send confirmation

### AC-09
- **Given** a Student submits a booking that satisfies R1–R4
- **When** the booking is successfully created
- **Then** the system produces a confirmation of the completed booking.

### AC-10
- **Given** the Student has a booking they made
- **When** the Student successfully cancels that booking
- **Then** the system produces a confirmation of the completed cancellation.

### AC-11
- **Given** a booking request violates at least one of R1–R4
- **When** the Student submits the booking
- **Then** the system rejects the booking and does not produce a successful booking confirmation.