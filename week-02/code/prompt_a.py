def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("Marks list cannot be empty")

    for mark in marks:
        if not isinstance(mark, (int, float)):
            raise TypeError("All marks must be numbers")
        if mark < 0 or mark > 100:
            raise ValueError("Marks must be between 0 and 100")

    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = (passed / len(marks)) * 100

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate
    }


# Example
marks = [75, 60, 45, 90, 55]

result = analyze_marks(marks)
print(result)