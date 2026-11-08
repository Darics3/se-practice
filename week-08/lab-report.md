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
Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test:

FAIL src/booking.test.ts > canBook > T01 AC4: touching after an existing booking is allowed
AssertionError: expected false to be true

- Expected
+ Received

- true
+ false

Input:
start = 660
end = 720
now = 540
blocked = false
bookings = [{ start: 600, end: 660 }]

Code of canBook:

// Practice #08 - the provided booking function. DO NOT EDIT THIS FILE.
// Copy the whole canBook function below over the canBook in your own app/src/booking.ts,
// keep everything else in your file, commit, and run your Week 07 suite.

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
## Bug Detector Report — Room Booking

2 confirmed defects

The failing test is correct. The implementation violates AC4 by treating bookings that touch at their endpoints as overlapping. It also independently violates AC5 by modifying the original bookings array.

### 1. Reproduce the failure

Input:
```
start = 660;
end = 720;
now = 540;
blocked = false;
bookings = [{ start: 600, end: 660 }];
```

Booking timeline (minutes)

Both intervals meet at 660, but their durations do not overlap.

Expected: `true` — Available.

Actual: `false` — Unavailable.

### 2. Defect analysis

| Defect | Root cause | Requirement |
| --- | --- | --- |
| Incorrect overlap detection | `<=` and `>=` include shared endpoints | AC4 |
| Unexpected array mutation | `bookings.push(...)` changes input data | AC5 |

Defect 1 — AC4

Current code:
```
if (start <= b.end && end >= b.start) return false;
```

When `start = 660` and `b.end = 660`, the first condition is true. The function incorrectly rejects the valid booking.

Defect 2 — AC5

Current code:
```
bookings.push({ start, end });
```

Even when a booking is available, this line modifies the original array. Availability checking should not create a booking.

### 3. Minimal proposed patch

```
- if (start <= b.end && end >= b.start) return false;
+ if (start < b.end && end > b.start) return false;
```

Strict inequalities allow intervals to touch without overlapping.

```
- bookings.push({ start, end });
  return true;
```

Removing `push` makes `canBook` a read-only availability check.

These are the only two changes needed for the confirmed defects. No other validation logic needs to change.

### 4. Regression tests (Vitest)

Add these tests to `src/booking.test.ts`, using the existing import of `canBook`.

```
import { describe, it, expect } from "vitest";
import { canBook } from "./booking";

describe("canBook regression tests", () => {
  it("AC4: allows touching after", () => {
    const result = canBook({
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    });

    expect(result).toBe(true);
  });

  it("AC4: allows touching before", () => {
    const result = canBook({
      start: 540,
      end: 600,
      now: 500,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    });

    expect(result).toBe(true);
  });

  it("AC4: rejects actual overlap", () => {
    const result = canBook({
      start: 650,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    });

    expect(result).toBe(false);
  });

  it("AC5: does not mutate bookings", () => {
    const bookings = [
      { start: 600, end: 660 },
    ];

    const result = canBook({
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings,
    });

    expect(result).toBe(true);
    expect(bookings).toEqual([
      { start: 600, end: 660 },
    ]);
  });
});
```

The AC5 test detects the mutation independently of the overlap bug once AC4 is fixed.

### 5. Final verification

| Criterion | Assessment |
| --- | --- |
| AC1 — Invalid/past times | No defect identified |
| AC2 — Maximum 120 minutes | No defect identified |
| AC3 — Blocked room | No defect identified |
| AC4 — Endpoint touching | Confirmed defect |
| AC5 — No data mutation | Confirmed defect |
| AC6 — UI feedback | Cannot verify from this function alone |

Conclusion: The root cause of T01 is incorrect inclusive overlap comparison. The minimal repair is to use strict inequalities and remove `bookings.push(...)`. The regression tests cover endpoint touching, genuine overlaps, and immutability.

No code or project files have been edited. These are proposed changes, not executed test results.
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
Use the bug-detector skill to diagnose the failed room-booking test.

AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test:

FAIL src/booking.test.ts > canBook > T01 AC4: touching after an existing booking is allowed
AssertionError: expected false to be true

- Expected
+ Received

- true
+ false

Input:
start = 660
end = 720
now = 540
blocked = false
bookings = [{ start: 600, end: 660 }]

Code of canBook:

```ts
// Practice #08 - the provided booking function. DO NOT EDIT THIS FILE.
// Copy the whole canBook function below over the canBook in your own app/src/booking.ts,
// keep everything else in your file, commit, and run your Week 07 suite.

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
# Bug Detector — Smart Campus Booking

Status: 2 confirmed defects found. No code modified.

## 1. Defect report

Field

BUG-01: Incorrect overlap detection

Requirement

AC4 — Allow bookings that only touch at endpoints

Evidence

Expected `true`, received `false`

Root cause

Line 18 uses inclusive comparisons (`<=` and `>=`)

Fix

Replace with strict comparisons (`<` and `>`)

Test

Booking `660–720` after `600–660` must return `true`

Field

BUG-02: Unexpected data mutation

Requirement

AC5 — Check availability without changing booking data

Evidence

Line 21 calls `bookings.push({ start, end })`

Root cause

Availability checking also modifies the original array

Fix

Remove the `bookings.push()` statement

Test

Original bookings must remain unchanged after checking

## 2. Root cause explanation

The problematic overlap condition is:

```
if (start <= b.end && end >= b.start) return false;
```

For the failing input:

- Existing booking: `[600, 660)`
- New booking: `[660, 720)`

The first comparison evaluates to `660 <= 660`, which is `true`. The second also evaluates to `true`. Therefore, the function incorrectly returns `false`.

These bookings share an endpoint but do not overlap.

## 3. Proposed minimal patch

```
for (const b of bookings) {
-  if (start <= b.end && end >= b.start) return false;
+  if (start < b.end && end > b.start) return false;
}

- bookings.push({ start, end });
return true;
```

This fixes both defects without changing the other validation rules.

## 4. Regression tests (Vitest)

```
import { describe, it, expect } from "vitest";
import { canBook } from "./booking";

describe("Booking regression tests", () => {
  it("AC4: allows touching endpoints", () => {
    const result = canBook({
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    });

    expect(result).toBe(true);
  });

  it("AC4: rejects actual overlap", () => {
    const result = canBook({
      start: 650,
      end: 720,
      now: 540,
      blocked: false,
      bookings: [{ start: 600, end: 660 }],
    });

    expect(result).toBe(false);
  });

  it("AC5: does not mutate bookings", () => {
    const bookings = [{ start: 600, end: 660 }];

    const result = canBook({
      start: 720,
      end: 780,
      now: 540,
      blocked: false,
      bookings,
    });

    expect(result).toBe(true);
    expect(bookings).toEqual([
      { start: 600, end: 660 },
    ]);
  });
});
```

## 5. Acceptance criteria assessment

AC1 — Valid time boundaries

Pass in inspected code

AC2 — Maximum 120 minutes

Pass in inspected code

AC3 — Blocked room

Pass in inspected code

AC4 — Overlap detection

Confirmed defect

AC5 — No data mutation

Confirmed defect

AC6 — Desktop/mobile feedback

Not assessable from this function

## Final diagnosis

Primary failure: The function treats touching endpoints as an overlap because it uses inclusive comparisons.

Secondary defect: The function modifies booking data using `push()`, violating AC5.

Both root causes are confirmed directly from the supplied source code. The proposed patch should correct these defects, but the tests have not been executed.

No files were edited.
```

Did the environment show that the skill was invoked? not shown

---

## 7. Comparison — judged against the actual code

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Correct. It identified BUG-A as the inclusive overlap condition using `<=` / `>=`, and BUG-B as `bookings.push(...)` mutating the original array. Both match the actual buggy code and our failing tests. | Correct. It identified the same two real defects: inclusive overlap comparisons for BUG-A and `bookings.push(...)` for BUG-B. |
| Reproducible test | Mostly correct, but the proposed AC5 mutation test uses `660–720`, which touches the existing booking. On the original buggy code, BUG-A can reject it before BUG-B is reached, so it does not independently reproduce BUG-B before fixing BUG-A. | Better. The BUG-B test uses `720–780`, which touches no existing booking, so BUG-A cannot hide the mutation. This matches our own BUG-B regression test approach. |
| Minimal proposed patch | Correct and minimal: change the overlap comparison to strict inequalities and remove the `bookings.push(...)` line. | Correct and minimal: the same one-line overlap change and removal of the mutation line. |
| Unsupported claims | Mostly careful. It said the defects were confirmed from the supplied code and clearly stated that tests were not executed. The main weakness is that its BUG-B regression test was not independent on the original buggy version. | Mostly careful and clearly stated that tests were not executed. The exact line numbers such as “Line 18” and “Line 21” depend on file formatting, so those line-number claims are not reliable evidence by themselves. |
| Clarity of explanation | Clear and detailed. It explains both defects well, but the regression-test section does not fully follow the assignment rule that BUG-B must fail independently before BUG-A is fixed. | Clearer for this task because it separates defect, evidence, root cause, fix, and test, and its BUG-B regression test matches the required independent reproduction. |

**Which bugs did each answer find?**

- No skill: both BUG-A and BUG-B.
- With skill: both BUG-A and BUG-B.
---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
   diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -14,7 +14,7 @@
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   bookings.push({ start, end });

Targeted BUG-A run:

Test Files  1 passed (1)
Tests       1 passed | 18 skipped (19)

Full suite after fixing only BUG-A:

Test Files  1 failed (1)
Tests       2 failed | 17 passed (19)

Failed:
BUG-B: available check does not mutate bookings
AC5: available check does not change existing bookings

BUG-A is fixed, while BUG-B remains reproducible.
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -17,6 +17,5 @@ export function canBook({ start, end, now, blocked, bookings }: {
     if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;
 }

Targeted BUG-B run:

Test Files  1 passed (1)
Tests       1 passed | 18 skipped (19)

Final full suite:

RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/week-08/app

✓ src/booking.test.ts (19)
  ✓ canBook (19)
    ✓ T01 AC4: touching after an existing booking is allowed
    ✓ BUG-A: request touching bookings on both sides is allowed
    ✓ BUG-B: available check does not mutate bookings
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
Tests       19 passed (19)
Start at    23:14:18
Duration    474ms (transform 50ms, setup 0ms, collect 76ms, tests 6ms, environment 0ms, prepare 160ms)

Both regression tests and the original Week 07 suite pass after the two minimal fixes.
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
