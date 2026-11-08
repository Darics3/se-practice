# Week 08 — Lab report

**Name:** Darkhan Izbasarov
**Group:** Monday 16:00-19:00
**Date:** 2026-11-08

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | ChatGPT |
| Exact model (with its version, or `not displayed`) | GPT-5.6 Sol |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | prompt-only simulation |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer |
| Vitest version (the `RUN  v…` line of a run) | 2.1.9 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | ts |
---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/week-08/app

✓ src/booking.test.ts (17)
  ✓ canBook (17)
    ✓ T01 AC4: touching after an existing booking is allowed
    ✓ T02 AC1: starting exactly at now is rejected
    ✓ T03 AC1: zero-duration interval is rejected
    ✓ T04 AC1: reversed interval is rejected
    ✓ T05 AC1: interval ending after 1440 is rejected
    ✓ T06 AC2: exactly 120 minutes is allowed
    ✓ T07 AC2: 121 minutes is rejected
    ✓ T08 AC4: touching before an existing booking is allowed
    ✓ T09 AC4: partial overlap is rejected
    ✓ T10 AC4: interval containing an existing booking is rejected
    ✓ T11 AC4: interval inside an existing booking is rejected
    ✓ T12 AC4: identical interval is rejected
    ✓ T13 AC3: blocked room is rejected
    ✓ T14 AC4: overlapping time is allowed when there are no bookings
    ✓ AC5: available check does not change existing bookings
    ✓ X1 AC1 AC4: one minute after now and touching booking is allowed
    ✓ X2 AC1: interval ending exactly at 1440 is allowed

Test Files  1 passed (1)
Tests       17 passed (17)
Start at    13:38:58
Duration    6.56s (transform 87ms, setup 0ms, collect 107ms, tests 11ms, environment 0ms, prepare 5.81s)
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:
```text
RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/week-08/app

❯ src/booking.test.ts (17)
  ❯ canBook (17)
    × T01 AC4: touching after an existing booking is allowed
    ✓ T02 AC1: starting exactly at now is rejected
    ✓ T03 AC1: zero-duration interval is rejected
    ✓ T04 AC1: reversed interval is rejected
    ✓ T05 AC1: interval ending after 1440 is rejected
    ✓ T06 AC2: exactly 120 minutes is allowed
    ✓ T07 AC2: 121 minutes is rejected
    × T08 AC4: touching before an existing booking is allowed
    ✓ T09 AC4: partial overlap is rejected
    ✓ T10 AC4: interval containing an existing booking is rejected
    ✓ T11 AC4: interval inside an existing booking is rejected
    ✓ T12 AC4: identical interval is rejected
    ✓ T13 AC3: blocked room is rejected
    ✓ T14 AC4: overlapping time is allowed when there are no bookings
    × AC5: available check does not change existing bookings
    × X1 AC1 AC4: one minute after now and touching booking is allowed
    ✓ X2 AC1: interval ending exactly at 1440 is allowed

Failed Tests 4

FAIL src/booking.test.ts > canBook > T01 AC4: touching after an existing booking is allowed
AssertionError: expected false to be true

FAIL src/booking.test.ts > canBook > T08 AC4: touching before an existing booking is allowed
AssertionError: expected false to be true

FAIL src/booking.test.ts > canBook > AC5: available check does not change existing bookings
AssertionError: expected false to be true

FAIL src/booking.test.ts > canBook > X1 AC1 AC4: one minute after now and touching booking is allowed
AssertionError: expected false to be true

Test Files  1 failed (1)
Tests       4 failed | 13 passed (17)
Start at    20:41:45
Duration    1.10s (transform 84ms, setup 0ms, collect 103ms, tests 12ms, environment 0ms, prepare 646ms)
```
### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
 RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/week-08/app

 ❯ src/booking.test.ts (19)
   ❯ canBook (19)
     × T01 AC4: touching after an existing booking is allowed
     × BUG-A: request touching bookings on both sides is allowed
     × BUG-B: available check does not mutate bookings
     ✓ T02 AC1: starting exactly at now is rejected
     ✓ T03 AC1: zero-duration interval is rejected
     ✓ T04 AC1: reversed interval is rejected
     ✓ T05 AC1: interval ending after 1440 is rejected
     ✓ T06 AC2: exactly 120 minutes is allowed
     ✓ T07 AC2: 121 minutes is rejected
     × T08 AC4: touching before an existing booking is allowed
     ✓ T09 AC4: partial overlap is rejected
     ✓ T10 AC4: interval containing an existing booking is rejected
     ✓ T11 AC4: interval inside an existing booking is rejected
     ✓ T12 AC4: identical interval is rejected
     ✓ T13 AC3: blocked room is rejected
     ✓ T14 AC4: overlapping time is allowed when there are no bookings
     × AC5: available check does not change existing bookings
     × X1 AC1 AC4: one minute after now and touching booking is allowed
     ✓ X2 AC1: interval ending exactly at 1440 is allowed

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 6 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T01 AC4: touching after an existing booking is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:20:7
     18|         bookings: freshBookings(),
     19|       }),
     20|     ).toBe(true);
       |       ^
     21|   });
     22|    test('BUG-A: request touching bookings on both sides is allowed', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/6]⎯

 FAIL  src/booking.test.ts > canBook > BUG-A: request touching bookings on both sides is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:36:7
     34|         bookings,
     35|       }),
     36|     ).toBe(true);
       |       ^
     37|   });
     38|   test('BUG-B: available check does not mutate bookings', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/6]⎯

 FAIL  src/booking.test.ts > canBook > BUG-B: available check does not mutate bookings
AssertionError: expected [ { start: 600, end: 660 }, …(2) ] to deeply equal [ { start: 600, end: 660 }, …(1) ]

- Expected
+ Received

  Array [
    Object {
      "end": 660,
      "start": 600,
    },
    Object {
      "end": 960,
      "start": 900,
    },
+   Object {
+     "end": 780,
+     "start": 720,
+   },
  ]

 ❯ src/booking.test.ts:56:20
     54|   ).toBe(true);
     55| 
     56|   expect(bookings).toEqual(before);
       |                    ^
     57| });
     58| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/6]⎯

 FAIL  src/booking.test.ts > canBook > T08 AC4: touching before an existing booking is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:141:7
    139|         bookings: freshBookings(),
    140|       }),
    141|     ).toBe(true);
       |       ^
    142|   });
    143| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/6]⎯

 FAIL  src/booking.test.ts > canBook > AC5: available check does not change existing bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:228:7
    226|         bookings,
    227|       }),
    228|     ).toBe(true);
       |       ^
    229| 
    230|     expect(bookings).toEqual(before);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/6]⎯

 FAIL  src/booking.test.ts > canBook > X1 AC1 AC4: one minute after now and touching booking is allowed
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:242:7
    240|         bookings: freshBookings(),
    241|       }),
    242|     ).toBe(true);
       |       ^
    243|   });
    244| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/6]⎯

 Test Files  1 failed (1)
      Tests  6 failed | 13 passed (19)
   Start at  21:29:06
   Duration  1.36s (transform 100ms, setup 0ms, collect 100ms, tests 23ms, environment 0ms, prepare 328ms)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.
| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | T01 / T08 / X1 | Request only touches an existing booking endpoint | true | false | I suspect the overlap condition uses non-strict comparisons such as `<=` instead of `<`. This would incorrectly treat touching endpoints as an overlap, although AC4 says touching is allowed. |
| BUG-B | AC5 | Available request with an existing bookings array | true and bookings unchanged | false before the unchanged-bookings assertion is reached | I suspect `canBook` changes the original `bookings` array in place. BUG-A may currently hide this defect because AC5 fails on the availability result before the immutability assertion runs. |
---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
bug-detector/SKILL.md
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->
I used a prompt-only simulation because the ChatGPT interface available to me did not provide a Skills upload page or `/skills` option. I opened a fresh chat and pasted the exact contents of `SKILL.md` as the first message, clearly stating that it was a prompt-only simulation and not an installed skill. I saved the evidence screenshot as `evidence/install.png`.
---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->
