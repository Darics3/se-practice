import unittest
from booking import can_book


class BookingTests(unittest.TestCase):
    # Six required table cases

    def test_touching_end_is_allowed(self):
        result = can_book(660, 720, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_overlap_is_rejected(self):
        result = can_book(630, 690, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_blocked_room_is_rejected(self):
        result = can_book(660, 720, 540, True, [(600, 660)])
        self.assertIs(result, False)

    def test_exactly_two_hours_is_allowed(self):
        result = can_book(720, 840, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_over_two_hours_is_rejected(self):
        result = can_book(720, 841, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_starting_now_is_rejected(self):
        result = can_book(540, 570, 540, False, [(600, 660)])
        self.assertIs(result, False)

    # Further boundary and input tests

    def test_zero_length_is_rejected(self):
        result = can_book(700, 700, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_reversed_time_is_rejected(self):
        result = can_book(720, 700, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_end_exactly_1440_is_allowed(self):
        result = can_book(1380, 1440, 540, False, [])
        self.assertIs(result, True)

    def test_end_after_1440_is_rejected(self):
        result = can_book(1380, 1441, 540, False, [])
        self.assertIs(result, False)

    def test_empty_existing_is_allowed(self):
        result = can_book(660, 720, 540, False, [])
        self.assertIs(result, True)

    def test_multiple_existing_bookings_are_checked(self):
        result = can_book(
            720, 780, 540, False,
            [(600, 660), (700, 760)]
        )
        self.assertIs(result, False)

    def test_existing_input_is_unchanged(self):
        existing = [(900, 960), (600, 660), (700, 760)]
        before = list(existing)

        can_book(780, 840, 540, False, existing)

        self.assertEqual(existing, before)

    def test_touching_before_existing_is_allowed(self):
        result = can_book(570, 600, 540, False, [(600, 660)])
        self.assertIs(result, True)

    def test_request_inside_existing_is_rejected(self):
        result = can_book(615, 645, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_request_contains_existing_is_rejected(self):
        result = can_book(570, 690, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_identical_interval_is_rejected(self):
        result = can_book(600, 660, 540, False, [(600, 660)])
        self.assertIs(result, False)

    def test_earliest_future_minute_is_allowed(self):
        result = can_book(1, 2, 0, False, [])
        self.assertIs(result, True)
if __name__ == "__main__":
    unittest.main()