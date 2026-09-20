# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:** Darkhan Izbassarov
**Group:** Monday, 16:00-19:00
**Date:** 20.09.2026

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant | ChatGPT |
| Exact model name | GPT-5.6 Sol |
| Implementation language | Python |
| Date of the runs | 20.09.2026 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```text
n/a — used Python
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes
- No follow-up questions were asked before Part 7: yes
- Every output was saved **before** any editing: yes

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1. It assumed that the function should be named `analyze_marks` and that the default pass mark should be 50.
2. It assumed that valid marks must be between 0 and 100.
3. It assumed that the function should return a dictionary with `average`, `highest`, `lowest`, and `pass_rate`.
4. It assumed that an empty list and out-of-range marks should raise `ValueError`.
5. It assumed that non-numeric marks should raise `TypeError`.

**Questions it should have asked and did not:**

1. What should happen for empty, non-numeric, or out-of-range input?
2. What exact function signature and return structure are required?

**Is the function named `analyze_marks` with the required signature?** yes

**First impression before testing:** The code looks surprisingly close to the required solution, but some validation choices may not match the exact specification.

---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. It explicitly required the function name and signature `analyze_marks(marks, pass_mark=50)`.
2. It explicitly required the return value to be a dictionary with `average`, `highest`, `lowest`, and `pass_rate`.
3. It required `ValueError` for empty, non-numeric, and out-of-range input, so unlike Prompt A the generated code uses `ValueError` for non-numeric marks.
4. It specified the valid range from 0 to 100 and required no external libraries.

**What B still leaves open:**

1. It does not specify whether `pass_rate` should be rounded, so the generated code returns the full floating-point value.
2. It does not explicitly state whether a mark equal to `pass_mark` should pass; the generated code assumed `>=`.

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes |
| decimals | yes |
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes 

**Do they agree with the harness in section 6?** yes / no — if no, where do they disagree:

**Assumptions C stated explicitly before the code:**

1. `pass_mark` must be numeric and between 0 and 100.
2. A mark passes when `mark >= pass_mark`.
3. `pass_rate` is returned as a percentage rounded to 2 decimal places.
4. `average` is rounded to 2 decimal places.
5. Boolean values such as `True` and `False` are rejected even though Python treats them as integers.

---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python developer. Implement a function analyze_marks(marks, pass_mark=50).

The function must return one dictionary containing exactly these four keys:
average, highest, lowest, and pass_rate.

Marks must be numeric values from 0 to 100 inclusive. The marks list must not be empty. Raise ValueError for an empty list, any non-numeric mark, or any mark outside the range 0 to 100. Boolean values should not be accepted as numeric marks.

A mark passes when mark >= pass_mark. pass_mark must be numeric and between 0 and 100; otherwise raise ValueError.

Use no external libraries.

Calculate average, highest, and lowest from the valid marks. Return pass_rate as a percentage rounded to 2 decimal places. This resolves the rounding ambiguity: for example, 2 passing marks out of 3 must return 66.67, not 66.6666666667.

Worked example:
analyze_marks([40, 60, 80], 50) should return:
{"average": 60.0, "highest": 80, "lowest": 40, "pass_rate": 66.67}

Also include tests for:
1. one mark,
2. decimal marks,
3. a custom pass_mark,
4. an empty list raising ValueError,
5. a text value raising ValueError,
6. marks below 0 or above 100 raising ValueError.

Return the code and a short explanation. State any assumptions before the code.
```

**What I deliberately added that A, B and C did not have:**

1. I explicitly required pass_mark itself to be numeric and between 0 and 100.
2. I explicitly rejected Boolean values even though Python treats bool as a subtype of int.
3. I explicitly defined the rounding rule for pass_rate: round the percentage to 2 decimal places.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:** 
The specification expects pass_rate to be 66.67 when two out of three marks pass, but the raw calculation gives 66.666666.... The specification did not directly state the rounding rule. I resolved this ambiguity in Prompt D by explicitly requiring pass_rate to be rounded to 2 decimal places.

---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | | | | |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | | | | |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | | | | |
| 4 | `analyze_marks([], 50)` | raises ValueError | | | | |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | | | | |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | | | | |
| | **Totals** | | /6 | /6 | /6 | /6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| | | |
| | | |
| | | |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```

```

**Prompt B**

```

```

**Prompt C**

```

```

**Prompt D**

```

```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | | | | |
| Requirement coverage | | | | |
| Verifiability (tests) | | | | |
| Assumptions stated | | | | |
| Noise (2 = none) | | | | |
| **Total / 10** | | | | |

**Prompt length, in words:** A ____ · B ____ · C ____ · D ____

**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:

---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)



```

**Word count:**

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.
2.
