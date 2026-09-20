def analyze_marks(marks, pass_mark=50):
    # Validate marks container
    if not isinstance(marks, (list, tuple)) or len(marks) == 0:
        raise ValueError("Marks must be a non-empty list or tuple.")

    # Validate pass_mark
    if isinstance(pass_mark, bool) or not isinstance(pass_mark, (int, float)):
        raise ValueError("pass_mark must be numeric.")

    if pass_mark < 0 or pass_mark > 100:
        raise ValueError("pass_mark must be between 0 and 100.")

    # Validate every mark
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("All marks must be numeric.")

        if mark < 0 or mark > 100:
            raise ValueError("Marks must be between 0 and 100.")

    # Calculate results
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = (passed / len(marks)) * 100

    return {
        "average": round(average, 2),
        "highest": highest,
        "lowest": lowest,
        "pass_rate": round(pass_rate, 2)
    }


# ---------------- TESTS ----------------

# 1. Example
assert analyze_marks([40, 60, 80], 50) == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 66.67
}

# 2. One mark
assert analyze_marks([75]) == {
    "average": 75.0,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0
}

# 3. Decimal marks
assert analyze_marks([45.5, 60.5, 80.0]) == {
    "average": 62.0,
    "highest": 80.0,
    "lowest": 45.5,
    "pass_rate": 66.67
}

# 4. Custom pass mark
assert analyze_marks([40, 60, 80], 70) == {
    "average": 60.0,
    "highest": 80,
    "lowest": 40,
    "pass_rate": 33.33
}


# Helper for checking expected ValueErrors
def expect_value_error(func, *args):
    try:
        func(*args)
        assert False, "Expected ValueError"
    except ValueError:
        pass


# 5. Empty list
expect_value_error(analyze_marks, [])

# 6. Text value
expect_value_error(analyze_marks, [40, "60", 80])

# 7. Mark below 0
expect_value_error(analyze_marks, [-5, 50, 80])

# 8. Mark above 100
expect_value_error(analyze_marks, [40, 50, 101])

print("All tests passed.")