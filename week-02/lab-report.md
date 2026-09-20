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
6. It added example data and printed the result even though I did not ask for an example or console output.

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
The AI wrote 8 tests in total.

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes |
| decimals | yes |
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes 

**Do they agree with the harness in section 6?** yes

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
3. I turned the rounding implied by Prompt C's example into an explicit rule: `pass_rate` must be rounded to 2 decimal places.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:** 
The specification expects pass_rate to be 66.67 when two out of three marks pass, but the raw calculation gives 66.666666.... The specification did not directly state the rounding rule. I resolved this ambiguity in Prompt D by explicitly requiring pass_rate to be rounded to 2 decimal places.

---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | PASS | PASS | PASS | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | PASS | PASS | PASS | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | PASS | PASS | PASS | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | PASS | PASS | PASS | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | PASS | PASS | PASS | PASS |
| | **Totals** | | **5/6** | **6/6** | **6/6** | **6/6** |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| A | 5 | Raised `TypeError: All marks must be numbers` instead of the required `ValueError`. |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```text
{'average': 65.0, 'highest': 90, 'lowest': 45, 'pass_rate': 80.0}
========================================================================
analyze_marks harness — code/prompt_a.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Marks list cannot be empty
------------------------------------------------------------------------
case 5  ERROR  analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: All marks must be numbers
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  5 PASS · 0 FAIL · 1 ERROR   (code/prompt_a.py)
========================================================================

```

**Prompt B**

```text
========================================================================
analyze_marks harness — code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Marks list cannot be empty.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: All marks must be numeric.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_b.py)
========================================================================

```

**Prompt C**

```text
All tests passed.
========================================================================
analyze_marks harness — code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Marks must be a non-empty list or tuple.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: All marks must be numeric.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Marks must be between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_c.py)
========================================================================

```

**Prompt D**

```text
All tests passed.
========================================================================
analyze_marks harness — code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must be a non-empty list
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_d.py)
========================================================================

```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 2 | 2 | 2 | 2 |
| Requirement coverage | 1 | 2 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 2 | 2 |
| Assumptions stated | 0 | 0 | 2 | 2 |
| Noise (2 = none) | 1 | 1 | 1 | 2 |
| **Total / 10** | **4** | **5** | **9** | **10** |

**Prompt length, in words:** A 7 · B 44 · C 84 · D 194

**Words added per point gained** — B over A, C over B, D over C:

B added 37 words for 1 extra point = 37 words per point.  
C added 40 words for 4 extra points = 10 words per point.  
D added 110 words for 1 extra point = 110 words per point.

This suggests that Prompt C gave the best improvement per added word, while Prompt D was the most complete but also the least efficient in terms of prompt length.

---

## 8. Conclusion — 150–200 words
```
Prompt D produced the highest overall score because it passed all six harness cases, included executable tests, stated assumptions explicitly, and kept the required return structure and validation rules clear. However, for a small task like this, I would probably use Prompt B at work because it already achieved 6/6 with a much shorter prompt.

The single addition that bought the most correctness was explicitly requiring `ValueError` for non-numeric input. In Prompt A, case 5 raised `TypeError: All marks must be numbers`, so the harness marked it ERROR. Prompt B changed that case to PASS by specifying `ValueError`.

Prompt C and D added useful verification, but some details did not improve the harness result because B had already reached 6/6. For example, extra checks for Boolean values and invalid `pass_mark` were not exercised by the six official cases.

The main ambiguity was rounding `pass_rate`. Prompt B returned `66.66666666666666` for case 1, which still passed because the harness tolerance was 0.01, while the specification showed 66.67. In Prompt D I resolved this by explicitly requiring `pass_rate` to be rounded to two decimal places.
```

**Word count:** 182

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.
2.
