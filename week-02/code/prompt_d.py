def analyze_marks(marks, pass_mark=50):
    # Validate marks list
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("marks must be a non-empty list")

    # Validate pass_mark
    if (
        isinstance(pass_mark, bool)
        or not isinstance(pass_mark, (int, float))
        or not 0 <= pass_mark <= 100
    ):
        raise ValueError("pass_mark must be numeric and between 0 and 100")

    # Validate every mark
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("all marks must be numeric")

        if not 0 <= mark <= 100:
            raise ValueError("marks must be between 0 and 100")

    # Calculate results
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passing_count = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = round((passing_count / len(marks)) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }


# --------------------
# Tests
# --------------------

# 1. One mark
assert analyze_marks([80]) == {
    "average": 80.0,
    "highest": 80,
    "lowest": 80,
    "pass_rate": 100.0
}

# 2. Decimal marks
assert analyze_marks([40.5, 60.5, 80.5]) == {
    "average": 60.5,
    "highest": 80.5,
    "lowest": 40.5,
    "pass_rate": 66.67
}

# 3. Custom pass_mark
assert analyze_marks([40, 60, 80], 70) == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 33.33
}

# Worked example
assert analyze_marks([40, 60, 80], 50) == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 66.67
}


# Helper for checking ValueError
def expect_value_error(function_call):
    try:
        function_call()
        assert False, "Expected ValueError"
    except ValueError:
        pass


# 4. Empty list
expect_value_error(lambda: analyze_marks([]))

# 5. Text value
expect_value_error(lambda: analyze_marks([50, "60", 70]))

# 6. Mark below 0
expect_value_error(lambda: analyze_marks([-1, 50, 70]))

# 6. Mark above 100
expect_value_error(lambda: analyze_marks([50, 70, 101]))

# Extra checks for boolean values and invalid pass_mark
expect_value_error(lambda: analyze_marks([True, 70]))
expect_value_error(lambda: analyze_marks([50, 70], True))
expect_value_error(lambda: analyze_marks([50, 70], 101))

print("All tests passed.")