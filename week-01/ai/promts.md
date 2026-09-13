# AI Asked Questions.
## Promt 1
# Rocket Prompt Log

## Initial Prompt

Build a small program that processes a list of student marks and prints:
average, highest, lowest, and pass rate.

## Questions Asked by Rocket

### Question 1
How will marks be entered into the tool?

### My Answer
Paste or bulk report

### Question 2
Who is this tool for?

### My Answer
Just for personal use

## Rocket Rewritten Prompt

A simple personal web tool where you paste a list of student marks in bulk and instantly get back the key statistics — average score, highest mark, lowest mark, and pass rate — displayed clearly on screen.

## What Rocket Added

Pass Threshold 

## Test Results

## Test A

**Input:**

`85, 23, 45, 90, 92`

**Rocket output:**

- Valid Marks: 5
- Average: 67.00
- Highest: 92
- Lowest: 23
- Pass Threshold: 50
- Pass Count: 3 (60.0%)
- Fail Count: 2

**Match specification:** Yes

## Test B

**Input:**

`88, 47, -5, 101, abc, 73, 50, , 100`

**Rocket output:**

- Valid Marks: 5
- Average: 64,86
- Highest: 101
- Lowest: -5
- Pass Threshold: 50
- Pass Count: 4 (71,4%)
- Fail Count: 2

**Match specification:** No

## Test C

**Input:**

`10, 20, 30`

**Rocket output:**

- Valid Marks: 3
- Average: 20.00
- Highest: 30
- Lowest: 10
- Pass Threshold: 50
- Pass Count: 0 (0.0%)
- Fail Count: 3

**Match specification:** No

## Test D

**Input:**

`abc, , xyz`

**Rocket output:**

- Valid Marks: 0
- No valid marks found.
- No statistics were calculated.

**Match specification:** Yes

## Defect Fix

### Problem
Rocket treated `101` as a valid mark, but the specification says valid marks must be from 0 to 100 inclusive.

### Follow-up Prompt
Fix the program so that marks below 0 or above 100 are ignored and are not included in the statistics.

### Result
fixed.Write if marks outside the valid range.