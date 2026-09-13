marks = input("Enter your marks: ").split(",")

count = 0
total = 0
passed = 0
highest = None
lowest = None

for value in marks:
    value = value.strip()

    try:
        mark = float(value)
    except ValueError:
        continue

    if mark < 0 or mark > 100:
        continue

    count += 1
    total += mark

    if highest is None or mark > highest:
        highest = mark

    if lowest is None or mark < lowest:
        lowest = mark

    if mark >= 50:
        passed += 1

if count == 0:
    print("No valid marks")
else:
    average = total / count
    pass_rate = passed / count * 100

    print("Number of valid marks:", count)
    print("Average:", f"{average:.2f}")
    print("Highest:", highest)
    print("Lowest:", lowest)
    print("Pass rate:", f"{pass_rate:.1f}%")
