# Week 05 — Lab report

**Name:** Darkhan Izbassarov
**Group:** Monday 16:00-19:00
**Date:** 2026-10-06
---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | ChatGPT |
| **Exact** model name | GPT-5.6 Sol |
| Language and version | Python 3.13.1 |
| Path | A |
| My Week 04 declaration for touching bookings | allowed |

<!-- If your Week 04 model said touching bookings are NOT allowed: AC4 now says they are.
     One sentence here on what that changes in your Week 04 diagrams. This is a finding, not a penalty. -->

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text

A short, safe implementation plan would be:

1. **Validate the requested interval and future start — AC1.**
   Check that `start` and `end` satisfy `0 <= start < end <= 1440`, then check that `start > now`. If any part fails, return `False`.
2. **Check duration — AC2.**
   Compute the requested duration as `end - start`. If it is greater than `120` minutes, return `False`.
3. **Check room status — AC3.**
   If `blocked` is `True`, return `False`.
4. **Check every active existing booking — AC4.**
   Treat all intervals as **start-inclusive, end-exclusive**. The requested interval must not intersect any `(existing_start, existing_end)` interval. Touching is allowed, so a request ending exactly when an existing booking starts is valid, and a request starting exactly when an existing booking ends is valid.
5. **Final decision — AC5.**
   If all checks pass, return `True`. Otherwise return `False`. Do not modify `existing`, its tuples, or any other input.

### Assumptions

Based only on the supplied contract:

- `now` is already valid and is between `0` and `1439`.
- `blocked` is already a Boolean.
- Every tuple in `existing` is already a valid active booking for the selected room.
- All times refer to the **same date** and are integer minutes after midnight.
- `1440` is allowed for `end`, representing the end of the day.
- `start` must be **strictly greater than** `now`; `start == now` is not allowed.
- Duration of exactly `120` minutes is allowed.
- `existing` may be empty.
- The function only makes a decision; it does not save a booking or send confirmation.

### Boundary cases worth testing

| Case                           | Example                                   | Expected                         |
| ------------------------------ | ----------------------------------------- | -------------------------------- |
| Earliest possible valid start  | `now=0, start=1, end=2`                   | `True` if otherwise clear        |
| Start exactly now              | `now=600, start=600, end=660`             | `False`                          |
| Start one minute after now     | `now=600, start=601, end=660`             | `True` if otherwise clear        |
| Negative start                 | `start=-1, end=60`                        | `False`                          |
| Start equals end               | `start=600, end=600`                      | `False`                          |
| Start after end                | `start=700, end=600`                      | `False`                          |
| End exactly 1440               | `start=1380, end=1440`                    | Valid range                      |
| End above 1440                 | `start=1380, end=1441`                    | `False`                          |
| Duration exactly 120           | `start=600, end=720`                      | Valid duration                   |
| Duration 121                   | `start=600, end=721`                      | `False`                          |
| Blocked room                   | `blocked=True`                            | `False`                          |
| No existing bookings           | `existing=[]`                             | `True` if AC1–AC3 pass           |
| Ends when booking starts       | request `(600,660)`, existing `(660,720)` | `True`                           |
| Starts when booking ends       | request `(720,780)`, existing `(660,720)` | `True`                           |
| One-minute overlap             | request `(600,661)`, existing `(660,720)` | `False`                          |
| Request inside existing        | request `(630,660)`, existing `(600,700)` | `False`                          |
| Existing inside request        | request `(600,720)`, existing `(630,660)` | `False`                          |
| Same interval                  | request `(600,720)`, existing `(600,720)` | `False`                          |
| Multiple bookings, one overlap | only one tuple overlaps                   | `False`                          |
| Input mutation check           | save copy of `existing`, call function    | `existing` must remain identical |

The most important bug-catching cases are the **touching endpoints**, **exactly 120 minutes vs. 121 minutes**, and **`start == now` vs. `start == now + 1`**.

```
**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | The plan checks the valid time range and future start, duration, blocked status, overlap, and final decision without modifying inputs. | These checks match AC1, AC2, AC3, AC4, AC5 and the contract requirement to keep inputs unchanged. | Kept the plan. I found no invented rule. |

**Boundary cases the assistant suggested that I kept as tests:**
- Start equals end — AC1.
- Start after end — AC1.
- End exactly 1440 — AC1.
- End above 1440 — AC1.
- Empty `existing` list — contract / AC4.
- Multiple existing bookings with one overlap — AC4.
- Request inside an existing booking — AC4.
- Existing booking inside the request — AC4.
- Same interval as an existing booking — AC4.
- Input mutation check — AC5 / contract.


---



## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if not (0 <= start < end <= 1440):` | AC1 | Yes. It rejects invalid day bounds, zero-length intervals and reversed intervals. |
| 2 | `if start <= now:` | AC1 | Yes. AC1 requires `start > now`, so equality and past starts must be rejected. |
| 3 | `if end - start > 120:` | AC2 | Yes. Exactly 120 minutes is allowed; only durations greater than 120 are rejected. |
| 4 | `if blocked:` | AC3 | Yes. A blocked room must not accept a new booking. |
| 5 | `if start < existing_end and end > existing_start:` | AC4 | Yes. This detects overlap for half-open intervals and still allows touching endpoints. |
| 6 | `return True` | AC5 | Yes. It is reached only after AC1–AC4 have all passed. |

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- None.

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |
| 9 | | | | | | | |
| 10 | | | | | | | |
| 11 | | | | | | | |

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
(paste here)
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | | accept / reject | | |
| 2 | | accept / reject | | |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | | | |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
(paste here)
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)
```

### 8.3 Path B only — three faults I planted myself

Break your own function on purpose, one line at a time, run your suite, restore the line.

| # | Line I changed (before → after) | AC it breaks | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

The three failing runs (Path A students leave this block empty):

```text
```

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

-

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->
