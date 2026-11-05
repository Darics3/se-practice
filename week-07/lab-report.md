# Week 07 — Lab report

**Name:** Darkhan Izbassarov 
**Group:** Monday 16:00-19:00
**Date:** 2026-11-05

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) | week-06 |
| Bolt project link (or `not shared`, and why) | https://bolt.new/~/sb1-3qzqwxxp |
| Assistant that generated the tests (tool) | ChatGPT |
| Exact model (with its version, or `not displayed`) | GPT-5.6 Sol |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer |
| Vitest version (the `RUN v…` line of a run) | v2.1.9 |
| Test command | npx vitest run |

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?


| | |
| --- | --- |
| File and function (or "inside the page component") | `app/src/bookingLogic.ts`, function `checkAvailability(...)` |
| Its inputs | `startMin`, `endMin`, selected `room`, `roomBookings`, and `currentTime` |
| What it returned | A `CheckResult` object with `available: true/false` and, when unavailable, a human-readable `reason` |
| How the page used it | The page called `checkAvailability(...)` after converting the entered times to minutes, then displayed Available / Unavailable and the returned reason |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

<!-- Write below this line -->
I created `app/src/booking.ts` and extracted the core booking decision into a new `canBook` function. It receives the candidate start and end times, the supplied current time, the blocked state, and the existing bookings, then returns only `true` or `false`. I kept the validation messages and time conversion in `App.tsx`. The page now imports and calls `canBook`, while the existing `checkAvailability` function is still used only to provide a human-readable reason when the result is unavailable. The booking rules themselves were not intentionally changed.
---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | Starts exactly where the booking ends, so the intervals only touch. Touching is not overlap, and 60 minutes is within the limit, so it is allowed. |
| T02 | 540–570 (starts now) | false | AC1 | Start must be strictly after now, and 540 is equal to now, not after it. |
| T03 | 720–720 (zero duration) | false | AC1 | AC1 requires start < end, and here they are equal, so there is no real interval. |
| T04 | 750–720 (reversed) | false | AC1 | The end is before the start, which breaks start < end. |
| T05 | 1380–1441 (past day end) | false | AC1 | End must be at most 1440, and 1441 is past the end of the day. |
| T06 | 720–840 (120 minutes) | true | AC2 | AC2 rejects only bookings longer than 120 minutes, so exactly 120 minutes is allowed. |
| T07 | 720–841 (121 minutes) | false | AC2 | One minute over the 120-minute maximum. |
| T08 | 570–600 (touching before) | true | AC4 | Ends exactly where the booking starts, so it only touches. Start 570 is after now, so it is valid. |
| T09 | 630–690 (partial overlap) | false | AC4 | The request begins inside the booking (630 < 660) and ends after it, so it overlaps. |
| T10 | 570–690 (contains booking) | false | AC4 | The request covers the whole booking from both sides. It is valid on length (120), so only the overlap rule rejects it. |
| T11 | 615–645 (inside booking) | false | AC4 | The request lies completely inside the existing booking, so it overlaps. |
| T12 | 600–660 (identical interval) | false | AC4 | Same start and end as the booking, so it overlaps completely. |
| T13 | 660–720, blocked = true | false | AC3 | This request would be allowed with an open room (see T01), so blocked is the only reason to reject it. |
| T14 | 630–690, bookings = [] | true | AC4 | The same interval was rejected in T09 only because of the booking. With no bookings there is nothing to overlap, so it is allowed. |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 | Checking availability must never change existing bookings, so the list is identical after the call. |
| X1 | 541–600 (starts one minute after now) | true | AC1, AC4 | T02 tests only start = now, which is invalid. This tests the first valid start, now + 1. It also touches the booking at 600, which is not overlap. |
| X2 | 1380–1440 (ends exactly at day end) | true | AC1 | T05 tests 1441, which is outside the day. This tests the exact upper boundary, 1440, which AC1 allows. The request is otherwise valid, so the expected result is true. |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

````text
Generate tests for the existing booking function using Vitest. Use AC1–AC6 and the reviewed case table below.

Import the real function used by the page. Keep its code unchanged. Use fixed time and fresh fixtures. Assert exact decisions and unchanged booking data.

Return the test file, run command, and AC mapping. Flag unclear requirements. We will run the tests ourselves.

Acceptance criteria:

AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time.
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: Show a clear Available / Unavailable decision without changing the existing booking data.
AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback.

Reviewed case table:

| ID | Candidate / changed input | Expected | AC | Reason |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | Starts exactly where the booking ends, so the intervals only touch. Touching is not overlap, and 60 minutes is within the limit, so it is allowed. |
| T02 | 540–570 (starts now) | false | AC1 | Start must be strictly after now, and 540 is equal to now, not after it. |
| T03 | 720–720 (zero duration) | false | AC1 | AC1 requires start < end, and here they are equal, so there is no real interval. |
| T04 | 750–720 (reversed) | false | AC1 | The end is before the start, which breaks start < end. |
| T05 | 1380–1441 (past day end) | false | AC1 | End must be at most 1440, and 1441 is past the end of the day. |
| T06 | 720–840 (120 minutes) | true | AC2 | AC2 rejects only bookings longer than 120 minutes, so exactly 120 minutes is allowed. |
| T07 | 720–841 (121 minutes) | false | AC2 | One minute over the 120-minute maximum. |
| T08 | 570–600 (touching before) | true | AC4 | Ends exactly where the booking starts, so it only touches. Start 570 is after now, so it is valid. |
| T09 | 630–690 (partial overlap) | false | AC4 | The request begins inside the booking and ends after it, so it overlaps. |
| T10 | 570–690 (contains booking) | false | AC4 | The request covers the whole booking from both sides. |
| T11 | 615–645 (inside booking) | false | AC4 | The request lies completely inside the existing booking, so it overlaps. |
| T12 | 600–660 (identical interval) | false | AC4 | Same start and end as the booking, so it overlaps completely. |
| T13 | 660–720, blocked = true | false | AC3 | This request would be allowed with an open room, so blocked is the only reason to reject it. |
| T14 | 630–690, bookings = [] | true | AC4 | With no bookings there is nothing to overlap, so it is allowed. |
| AC5 | an Available request — bookings after the call equal bookings before | true, data unchanged | AC5 | Checking availability must never change existing bookings. |
| X1 | 541–600 | true | AC1, AC4 | This tests the first valid start after now and touches the booking at 600. |
| X2 | 1380–1440 | true | AC1 | This tests the exact upper boundary of the day, which AC1 allows. |

Existing function:

```ts
export type ExistingBooking = {
  start: number;
  end: number;
};

type CanBookInput = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: ExistingBooking[];
};

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: CanBookInput): boolean {
  if (!(0 <= start && start < end && end <= 1440)) {
    return false;
  }

  if (start <= now) {
    return false;
  }

  if (end - start > 120) {
    return false;
  }

  if (blocked) {
    return false;
  }

  for (const booking of bookings) {
    if (start < booking.end && booking.start < end) {
      return false;
    }
  }

  return true;
}
```
````

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

````text
Created the Vitest test suite using all 16 reviewed cases plus 2 additional AC5 immutability tests.

Download canBook.test.ts

The suite imports `canBook` rather than duplicating its implementation. The production function remains unchanged.

## 1. Test setup

- Framework: Vitest
- Fixed current time: `now = 540` (09:00)
- Default existing booking: `600–660` (10:00–11:00)
- Fresh fixtures: New booking objects for each test
- Assertions: Exact `true`/`false` using `toBe()`
- Immutability: Checks booking values and object references after every call
- Mocks: None

The test file assumes it sits alongside `canBook.ts` and imports `./canBook`. The page's actual import path could not be verified from the supplied code, so adjust that path if necessary.

## 2. Run command

From your project root:
```
npx vitest run canBook.test.ts
```

If Vitest is not installed:
```
npm install -D vitest
```

## 3. Acceptance criteria mapping

|   |
| - |

AC

|   |
| - |

Tests

|   |
| - |

Coverage

|   |
| - |

AC1 — Valid interval/time

|   |
| - |

T02–T05, X1, X2

|   |
| - |

Covered

|   |
| - |

AC2 — 120-minute limit

|   |
| - |

T06, T07

|   |
| - |

Covered

|   |
| - |

AC3 — Blocked room

|   |
| - |

T13

|   |
| - |

Covered

|   |
| - |

AC4 — Overlap rules

|   |
| - |

T01, T08–T12, T14, X1

|   |
| - |

Covered

|   |
| - |

AC5 — Decision and unchanged data

|   |
| - |

All 16 cases + 2 AC5 tests

|   |
| - |

Partially covered

|   |
| - |

AC6 — Responsive UI and feedback

|   |
| - |

None

|   |
| - |

Not covered

18 executable tests total. Tests have been generated but not run.

## 4. Requirements needing clarification

AC5: The boolean decision and booking-data immutability are tested. Displaying the exact words "Available" and "Unavailable" requires a page/component test because `canBook()` returns only a boolean.

AC6: Responsive desktop/mobile behavior and understandable validation feedback cannot be verified from the pure booking function. These require the page component, its actual UI, and defined viewport sizes and expected messages.

Additional input validation: The requirements do not specify whether fractional minutes, `NaN`, or other non-finite numbers must be rejected. The supplied implementation does not explicitly validate integer or finite-number inputs.

Import path: The actual production module location remains unverified.

The file is ready for your team to place beside the production booking module and execute.
````

The first suite was saved to `suites/first/` **before** I changed anything in it: yes

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | Import of `canBook` | Imports `./canBook`, but the real production module used by the page is `./booking` | revise | The test must import the real function used by the UI; otherwise it will not test the production module |
| 2 | `it.each(...)` table-driven tests | The suite groups many cases into `it.each`, but the final rules require one separately named test per case ID | revise | The checker requires one test per case with the ID in its title, and explicitly disallows `test.each` / `it.each` |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
RUN v2.1.9 C:/Users/Asus/Documents/se-practice/week-07/app

❯ src/booking.test.ts (0)

Failed Suites 1

FAIL src/booking.test.ts [ src/booking.test.ts ]
Error: Failed to load url ./canBook (resolved id: ./canBook) in C:/Users/Asus/Documents/se-practice/week-07/app/src/booking.test.ts. Does the file exist?

Test Files  1 failed (1)
Tests       no tests
Start at    22:21:01
Duration    1.32s (transform 71ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 922ms)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| `src/booking.test.ts` | Import / runner error: failed to load `./canBook` | Checked the import path and the real production module name | Test repair | The generated suite imports `./canBook`, but the real module used by the page is `./booking`. The import will be corrected in the improved suite. |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text


#### Prompt sent

````text
Review this test suite against AC1–AC6 and our case table. Identify incorrect expectations, weak assertions, duplicated cases, and missing boundaries.

For each proposed change, explain the requirement and the defect it could detect. Improve the tests without changing correct expectations to match buggy behavior.

Use the actual failure output below. Separate test repairs from implementation fixes.

RUN v2.1.9 C:/Users/Asus/Documents/se-practice/week-07/app

❯ src/booking.test.ts (0)

Failed Suites 1

FAIL src/booking.test.ts [ src/booking.test.ts ]
Error: Failed to load url ./canBook (resolved id: ./canBook) in C:/Users/Asus/Documents/se-practice/week-07/app/src/booking.test.ts. Does the file exist?

Test Files  1 failed (1)
Tests       no tests
Start at    22:21:01
Duration    1.32s (transform 71ms, setup 0ms, collect 0ms, tests 0ms, environment 0ms, prepare 922ms)
````

#### Assistant's answer

````text
## Review result

Import error — no tests executed

The Vitest output shows:
```
Failed to load url ./canBook
Tests: no tests
```

This is a test setup failure, not a failed booking rule. Vitest could not import the module, so none of the test expectations have been evaluated.

I reviewed all 16 original cases (T01–T14, X1–X2) against the supplied implementation and acceptance criteria. All 16 expected boolean results are correct. None should be changed to accommodate buggy behavior.

## 1. Improved test file

Download improved booking.test.ts

23 tests · Original expectations preserved · 7 additional cases

The revised file uses fresh fixtures, exact boolean assertions, booking-value comparisons, and object-reference checks.

One required setup step remains: replace the clearly marked `./ACTUAL_MODULE` import with the real module path. That path cannot be determined from the failure output alone.

## 2. Review of proposed changes

|   |
| - |

Change

|   |
| - |

Requirement

|   |
| - |

Defect it could detect

|   |
| - |

Repair import path

|   |
| - |

Test the real `canBook` function

|   |
| - |

Tests importing a missing or duplicate implementation

|   |
| - |

B01: start before now

|   |
| - |

AC1

|   |
| - |

Code rejecting only `start === now` but accepting earlier starts

|   |
| - |

B02: one-minute interval

|   |
| - |

AC1

|   |
| - |

Code incorrectly rejecting the smallest positive integer-minute duration

|   |
| - |

B03–B04: lower boundary 0

|   |
| - |

AC1

|   |
| - |

Incorrect lower-bound comparison, such as `start > 0` instead of `start >= 0`

|   |
| - |

B05: overlap from left

|   |
| - |

AC4

|   |
| - |

Overlap logic detecting only intervals that start inside an existing booking

|   |
| - |

B06: overlap with second booking

|   |
| - |

AC4

|   |
| - |

Loop checking only the first booking or returning `true` too early

|   |
| - |

B07: available gap between bookings

|   |
| - |

AC4

|   |
| - |

Code rejecting every request when bookings exist, even without overlap

|   |
| - |

Check values and references in every case

|   |
| - |

AC5

|   |
| - |

Accidental deletion, reordering, modification, or replacement of bookings

B03–B04 use synthetic negative `now` values to isolate the `start >= 0` condition. The supplied contract does not restrict `now`, but whether negative current times should be considered valid inputs needs clarification.

## 3. Weak assertions and duplicated cases

The original suite already had good exact `toBe(true/false)` assertions and compared booking values and references.

Its main weakness was coverage, not incorrect expectations.

The two additional AC5 tests repeated the T01 and T09 decision scenarios, although they used an extra booking. I removed those separate tests because every table-driven test already checks immutability. B06 and B07 now exercise multiple bookings more purposefully.

The revised assertions still verify the expected decision, the entire booking array's values and order, and the identity of every original booking object. These checks establish that booking data is unchanged after the call; they do not prove that no temporary mutation occurred during execution.

## 4. Test repairs versus implementation fixes

Test repair — required

Find the actual function in your project. Run this in PowerShell from the project root:
```
Get-ChildItem .\\src -Recurse -Include *.ts,*.tsx | Select-String "canBook"
```

Then point the test import to that exported production module. For example, if the function is exported from `src/lib/booking.ts`, use:
```
import { canBook, type ExistingBooking } from './lib/booking';
```

Do not create a replacement `canBook` inside the test file.

Implementation fixes — not yet justified

The reported failure provides no evidence that the booking algorithm is wrong.

If `canBook` exists but is not exported, making it available to tests may require a non-behavioral production refactor. That is separate from changing its decision logic.

After the import is repaired, any failing decision test should be investigated against its acceptance criterion. Do not change a correct expectation just to make the test pass.

## 5. AC coverage after improvements

|   |
| - |

Criterion

|   |
| - |

Status

|   |
| - |

AC1 — Interval and current-time boundaries

|   |
| - |

Covered, subject to `now` domain clarification

|   |
| - |

AC2 — Maximum 120 minutes

|   |
| - |

Covered

|   |
| - |

AC3 — Blocked room

|   |
| - |

Covered

|   |
| - |

AC4 — Overlap and touching endpoints

|   |
| - |

Covered

|   |
| - |

AC5 — Boolean decision and immutable bookings

|   |
| - |

Covered at function level

|   |
| - |

AC5 — Visible Available / Unavailable

|   |
| - |

Requires page testing

|   |
| - |

AC6 — Responsive layout and feedback

|   |
| - |

Requires page testing

For AC6, I recommend page-level tests at approximately 1280px desktop and 375px mobile width, checking that inputs and decisions remain accessible and that invalid requests produce understandable feedback. The page component and its expected messages are needed to author meaningful assertions; `canBook()` alone cannot verify those behaviors.

## 6. Run the revised suite

After correcting the import:
```
npx vitest run src/booking.test.ts
```

Expected test count: 23. The suite has not been executed against your local project.

The next meaningful result is the test output after import resolution. At that point, failures can be classified as genuine implementation defects, remaining test setup issues, or unclear requirements without weakening any correct expectation.

import { describe, expect, it } from 'vitest';

// IMPORTANT: Resolve this import to the ACTUAL exported module used by the page.
// The original './canBook' fails to resolve from src/booking.test.ts.
// Examples ONLY (do not guess): './App' for src/App.tsx, or
// './lib/booking' for src/lib/booking.ts. Do not copy canBook into this test.
import { canBook, type ExistingBooking } from './ACTUAL_MODULE';

const NOW = 540; // 09:00, fixed: no Date.now(), fake timers, or changing clock.
const DEFAULT_RANGES = [[600, 660]] as const; // 10:00–11:00

type Range = readonly [start: number, end: number];

type Case = {
  id: string;
  ac: string;
  start: number;
  end: number;
  expected: boolean;
  now?: number;
  blocked?: boolean;
  ranges?: readonly Range[];
};

function freshBookings(ranges: readonly Range[] = DEFAULT_RANGES): ExistingBooking[] {
  // New array AND new objects on every invocation (no shared mutable fixtures).
  return ranges.map(([start, end]) => ({ start, end }));
}

const cases: Case[] = [
  // Reviewed case table: preserve ALL expected outcomes.
  { id: 'T01', ac: 'AC4', start: 660, end: 720, expected: true },
  { id: 'T02', ac: 'AC1', start: 540, end: 570, expected: false },
  { id: 'T03', ac: 'AC1', start: 720, end: 720, expected: false },
  { id: 'T04', ac: 'AC1', start: 750, end: 720, expected: false },
  { id: 'T05', ac: 'AC1', start: 1380, end: 1441, expected: false },
  { id: 'T06', ac: 'AC2', start: 720, end: 840, expected: true },
  { id: 'T07', ac: 'AC2', start: 720, end: 841, expected: false },
  { id: 'T08', ac: 'AC4', start: 570, end: 600, expected: true },
  { id: 'T09', ac: 'AC4', start: 630, end: 690, expected: false },
  { id: 'T10', ac: 'AC4', start: 570, end: 690, expected: false },
  { id: 'T11', ac: 'AC4', start: 615, end: 645, expected: false },
  { id: 'T12', ac: 'AC4', start: 600, end: 660, expected: false },
  { id: 'T13', ac: 'AC3', start: 660, end: 720, blocked: true, expected: false },
  { id: 'T14', ac: 'AC4', start: 630, end: 690, ranges: [], expected: true },
  { id: 'X1', ac: 'AC1/AC4', start: 541, end: 600, expected: true },
  { id: 'X2', ac: 'AC1', start: 1380, end: 1440, expected: true },

  // Additional boundary and partition tests.
  { id: 'B01', ac: 'AC1', start: 539, end: 570, expected: false },
  { id: 'B02', ac: 'AC1', start: 660, end: 661, expected: true },
  // Synthetic negative 'now' values isolate the lower-day bound from start > now.
  // AC1 does not constrain 'now'; remove/revisit ONLY if that input domain is clarified.
  { id: 'B03', ac: 'AC1', start: -1, end: 30, now: -2, ranges: [], expected: false },
  { id: 'B04', ac: 'AC1', start: 0, end: 60, now: -1, ranges: [], expected: true },
  { id: 'B05', ac: 'AC4', start: 570, end: 630, expected: false },
  { id: 'B06', ac: 'AC4', start: 915, end: 945, ranges: [[600, 660], [900, 960]], expected: false },
  { id: 'B07', ac: 'AC4', start: 720, end: 780, ranges: [[600, 660], [900, 960]], expected: true },
];

describe('canBook — AC1–AC5 decision and immutability', () => {
  it.each(cases)('$id [$ac]: exact decision is $expected; bookings unchanged', (testCase) => {
    const bookings = freshBookings(testCase.ranges);
    const beforeValues = bookings.map(({ start, end }) => ({ start, end }));
    const beforeReferences = bookings.slice();

    const decision = canBook({
      start: testCase.start,
      end: testCase.end,
      now: testCase.now ?? NOW,
      blocked: testCase.blocked ?? false,
      bookings,
    });

    // Exact decision, not merely truthiness.
    expect(decision).toBe(testCase.expected);

    // Detect additions, deletions, reordering, and value changes.
    expect(bookings).toStrictEqual(beforeValues);

    // Detect replacement of a booking with a new equal-valued object.
    expect(bookings).toHaveLength(beforeReferences.length);
    for (let index = 0; index < bookings.length; index += 1) {
      expect(bookings[index]).toBe(beforeReferences[index]);
    }
  });
});

// AC5's visible 'Available' / 'Unavailable' text and AC6's layout/feedback
// require page/component tests. Do NOT mark them covered by this boolean unit test.
````
```

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
(paste here)
```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected / Survived | | |
| M2 | Treat touching endpoints as an overlap | Detected / Survived | | |
| M3 | Remove the blocked-room rejection | Detected / Survived | | |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

```text
(paste here)
```

All three changes reverted, and the full suite run again (section 6.3): yes / no

---

## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | | Pass / Fail / Not testable |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | | Pass / Fail / Not testable |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | | Pass / Fail / Not testable |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | | Pass / Fail / Not testable |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | | Pass / Fail / Not testable |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | | |
| Requirements with meaningful tests (AC IDs and gaps) | | |
| Selected mutants detected | | |
| Accepted / revised / rejected tests | | |
| Remaining limitations | | |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three in your own words, without the assistant:
     (a) Which mistake in the FIRST suite would have let a wrong canBook pass, and how did you find it?
     (b) What does your final green run prove, and what does it NOT prove? Use a mutant or a UI check.
     (c) One testing limitation that remains.
     Worthless: "The AI wrote good tests and they all passed."
     Worth everything: "The first suite expected T06 (exactly 120 minutes) to be rejected. That
     contradicts AC2, and it failed on a correct canBook. If I had changed the code to make it
     pass, M1 would have become the real behaviour." -->

<!-- Write your conclusion below this line -->
