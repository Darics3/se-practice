# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | ChatGPT |
| Assistant model | GPT-5.6 Sol |
| Starting point | week-08 |
| Baseline commit | 45e952d |
| Language (ts or js) | ts |
| Vitest version | 2.1.9 |
| Where I ran the tests | Local Windows PowerShell |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/sis-04/app

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
      Tests  19 passed (19)
   Start at  21:02:06
   Duration  5.68s (transform 95ms, setup 0ms, collect 159ms, tests 10ms, environment 0ms, prepare 5.05s)
```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
app/src/
├── App.tsx — main React UI; room selection, time form, availability result and timeline rendering.
├── booking.ts — canBook() implements the core AC1–AC5 booking decision rules.
├── bookingLogic.ts — time conversion, overlap helper and checkAvailability() with user-facing reasons.
├── sampleData.ts — current fictional rooms and bookings stored as separate arrays.
├── types.ts — Room, Booking, CheckResult and FormState TypeScript types.
├── booking.test.ts — existing Vitest regression suite for canBook; baseline has 19 passing tests.
├── main.tsx — React application entry point.
└── index.css — global styles.

app/package.json — Vite/React/TypeScript project scripts and dependencies, including Vitest.
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
I am extending my existing Smart Campus Room Availability Checker for SIS #04. Do not write or rewrite code yet. I need a codebase analysis and a small-step improvement plan before I edit app/src.

Repository map:

app/src/
├── App.tsx — main React UI; room selection, time form, availability result and timeline rendering.
├── booking.ts — canBook() implements the core AC1–AC5 booking decision rules.
├── bookingLogic.ts — time conversion, overlap helper and checkAvailability() with user-facing reasons.
├── sampleData.ts — current fictional rooms and bookings stored as separate arrays.
├── types.ts — Room, Booking, CheckResult and FormState TypeScript types.
├── booking.test.ts — existing Vitest regression suite for canBook; baseline has 19 passing tests.
├── main.tsx — React application entry point.
└── index.css — global styles.

app/package.json — Vite/React/TypeScript project scripts and dependencies, including Vitest.

Existing requirements that must remain unchanged:

AC1 — Reject start ≥ end and requests in the past.
AC2 — Enforce the maximum allowed duration of 120 minutes.
AC3 — Reject a blocked room.
AC4 — Reject overlapping bookings but allow bookings that only touch at endpoints.
AC5 — Return Available / Unavailable without changing booking data.
AC6 — Provide clear, responsive feedback on desktop and mobile.

New requirements:

F1 — Capacity filter: room capacity must be greater than or equal to requested attendees.
F2 — Equipment filter: the room must contain ALL selected required equipment.
F3 — A blocked room can never be reported available.
F4 — Show a clear empty state when no rooms match the filters.
F5 — Changing the selected room must refresh the result, and the availability check must use that selected room's own bookings.

Constraints:

- At least four fictional rooms.
- Every room must have id, name, capacity, equipment, blocked status and its own bookings.
- No login.
- No payments.
- No live APIs.
- No database.
- Fictional data only.
- Final modules must separate rooms, booking rules, filtering logic and UI.
- canBook behaviour for AC1–AC5 must not change.
- Avoid a full rewrite.
- Make changes in small, testable steps.

Please:
1. Identify at least three maintainability risks in this starting structure. For each risk, name the specific file or function and explain what evidence I should verify in the current code.
2. Give me a numbered improvement plan ordered from the smallest and safest change to larger refactoring steps.
3. Point out at least one tempting suggestion that I should reject or modify because it could violate an AC, F-rule, or the assignment constraints.

Do not provide implementation code yet.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | Booking rules are duplicated in two decision paths, which can cause inconsistent behaviour after future changes. | `src/booking.ts` — `canBook()`; `src/bookingLogic.ts` — `checkAvailability()`; `src/App.tsx` — `handleSubmit()` | `canBook()` checks AC1–AC4, while `checkAvailability()` separately repeats time validation, the 120-minute limit, blocked-room logic and overlap detection. `handleSubmit()` first calls `canBook()` and then calls `checkAvailability()` when the result is false. | High |
| 2 | The current room model does not match the new room-catalog requirement and keeps room data and bookings in separate structures. | `src/types.ts`, `src/sampleData.ts`, `src/App.tsx` | `Room` currently has id, name, location, capacity and blocked status, but no `equipment` or own `bookings`. `sampleData.ts` stores rooms and bookings in separate arrays, and `App.tsx` must filter the bookings array by `roomId`. | High |
| 3 | The main React component has too many responsibilities, making feature changes and regression checking harder. | `src/App.tsx` — `App()`, `handleSubmit()` and `Timeline()` | The same file manages form state, selected-room lookup, room-specific booking lookup, time conversion, availability calls, result rendering, schedule rendering and the timeline component. It also directly imports room data and booking helpers. | Medium |

### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. Preserve `canBook()` unchanged and add failing tests for the new room-catalog requirements before implementing them.

2. Create `src/rooms.ts` with the required `Room` type and at least four fictional `ROOMS`, where every room owns its equipment, blocked status and bookings.

3. Create the pure `filterRooms()` function in `src/filter.ts` and make the F1, F2, B5 and B6 tests pass without adding filtering rules to the UI.

4. Add `checkRoom()` to `src/booking.ts`. It will find the selected room and call the existing `canBook()` with that room's own `blocked` value and bookings, covering F3 and F5 while preserving AC1–AC5.

5. Refactor `App.tsx` to import `ROOMS`, `filterRooms()` and `checkRoom()` instead of owning room data or booking rules. Add attendee and equipment filters and the F4 empty state.

6. Remove duplicated availability-rule logic that is no longer needed, while keeping user-facing feedback clear and preserving all regression tests.

7. Run the full Vitest suite after each change, then create the before/after diagrams and capture the five required screenshots, including the room-switching and mobile-width evidence.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| “Clarify the data model — `types.ts`” and “Normalize fictional data — `sampleData.ts`.” | Modified | The assignment fixes the final layout: the `Room` type and the complete catalog must live in `src/rooms.ts`, while filtering must live in `src/filter.ts`. I will use the assistant's idea of putting bookings inside each room, but I will not keep the final room catalog in `types.ts` or `sampleData.ts`. This follows the required module structure and makes F5 easier to verify because `checkRoom()` receives the selected room's own bookings. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->
| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | Attendees 30 with projector and whiteboard leaves only rooms that satisfy both capacity and equipment filters. |
| `evidence/filter-empty.png` | Attendees 50 with 3d-printer produces no matching rooms and shows the clear empty-state message. |
| `evidence/switch-a.png` | Newton Lab is selected for 10:30–11:30 and the result is Unavailable because its existing booking overlaps. |
| `evidence/switch-b.png` | Darwin Seminar is selected with the same 10:30–11:30 time and the result changes to Available. |
| `evidence/narrow.png` | The application remains readable and responsive at narrow portrait phone width with the controls arranged correctly. |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities

| Module | Responsibility |
| --- | --- |
| `src/rooms.ts` | Defines the `Room` model and the fictional `ROOMS` catalog. Each room owns its capacity, equipment list, blocked status and bookings. |
| `src/filter.ts` | Contains the pure `filterRooms()` function used for the F1 capacity rule and F2 ALL-equipment rule. |
| `src/booking.ts` | Contains the existing `canBook()` decision rules for AC1–AC5 and `checkRoom()`, which selects one room and calls `canBook()` with that room's own blocked status and bookings. |
| `src/bookingLogic.ts` | Contains only time conversion and display-formatting helpers. It no longer decides whether a room is available. |
| `src/App.tsx` | Handles UI state, filter controls, room selection, availability feedback and responsive presentation. It imports the room, filtering and booking modules instead of containing those rules itself. |

The architecture before and after the refactoring is recorded in `diagrams/before.puml` and `diagrams/after.puml`.

### 5.2 Design decisions

### 5.2 Design decisions

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Store each room's bookings inside the `Room` object in `rooms.ts`. | Keep rooms and bookings as separate arrays in `sampleData.ts`. | This reduces the risk of checking bookings from the wrong room and directly supports F5 because `checkRoom()` uses the selected room's own data. |
| Keep blocked rooms visible when they satisfy capacity and equipment filters. | Remove blocked rooms completely inside `filterRooms()`. | F1 and F2 define filtering rules, while F3 defines availability, so a blocked room may remain visible but must never be reported Available. |
| Use `canBook()` as the single authoritative availability decision path. | Keep independent booking validation inside both `canBook()` and `checkAvailability()`. | One decision path prevents AC1–AC5 rules from drifting between modules and removes duplicated booking validation logic. |
### 5.3 Duplication removed

| Duplicated location before refactoring | Change made |
| --- | --- |
| `booking.ts` `canBook()` and `bookingLogic.ts` `checkAvailability()` both evaluated time, duration, blocked-room and overlap conditions. | The duplicated availability checks were removed from `bookingLogic.ts`. Availability is now decided through `checkRoom()` → `canBook()`. |
| Room/booking data was maintained separately in `sampleData.ts`, while the new room model required room-owned bookings. | The old `sampleData.ts` was removed. `rooms.ts` is now the single catalog, and every room owns its bookings. |
| Room-related type definitions existed separately from the new room model. | Room and booking domain types were consolidated in `rooms.ts`; `types.ts` now contains only UI/result types that are still needed. |

After the refactoring I ran:

`npm run typecheck`

and:

`npx vitest run`

The TypeScript check completed with no errors, and all **27 of 27 tests passed**, so the refactoring preserved the tested AC1–AC5 behaviour.
## 6. Automated tests (Task 4)

### 6.1 Test plan

The final test suite contains **27 executable Vitest tests** across three test files.


| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | `T02 AC1: exactly now is rejected` | start = now → false |
| AC2 | `T06 B1 AC2: exactly 120 minutes is allowed` | duration 120 minutes → true |
| AC3 | `T13 AC3: blocked room is rejected` | blocked = true → false |
| AC4 | `T01 B3 AC4: touching after an existing booking is allowed` | requested start = existing end → true |
| AC5 | `AC5: booking data is not mutated` | run availability check → original bookings unchanged |
| F1 | `F1: capacity >= attendees` | attendees = 10 → only rooms with capacity ≥ 10 included |
| F2 | `F2: room has ALL required equipment` | projector + whiteboard → only rooms containing both included |
| F3 | `F3: blocked room is never available` | blocked selected room → false |
| F4 | `F4: no matching rooms returns empty result` | attendees = 100 → empty array |
| F5 | `F5: selected room uses its own bookings` | same time, two rooms with different bookings → different results |
| B1 | `T06 B1 AC2: exactly 120 minutes is allowed` | 120-minute request → true |
| B2 | `T07 B2 AC2: 121 minutes is rejected` | 121-minute request → false |
| B3 | `T01 B3 AC4: touching after an existing booking is allowed` | touching endpoint → true |
| B4 | `T09 B4 AC4: partial overlap is rejected` | overlapping interval → false |
| B5 | `B5: exact capacity is included` | capacity = attendees = 8 → room included |
| B6 | `B6: one below capacity is excluded` | capacity 8, attendees 9 → room excluded |
| INT | `INT: filterRooms result can be checked with checkRoom` | filter rooms, then pass returned room to `checkRoom()` → expected availability |

Test files:

- `src/booking.test.ts` — 19 regression and boundary tests for `canBook()`.
- `src/filter.test.ts` — 5 tests for F1, F2, F4, B5 and B6.
- `src/roomBooking.test.ts` — 3 tests for F3, F5 and INT.

The feature tests use fixed fictional room catalogs inside the test files. They call the real `filterRooms()`, `checkRoom()` and `canBook()` implementations without mocks.

### 6.2 Commands used

TypeScript validation:

```text
npm run typecheck
```

Automated test suite:

```text
npx vitest run
```

### 6.3 Final test run

Final TypeScript check:

```text
> vite-react-typescript-starter@0.0.0 typecheck
> tsc --noEmit -p tsconfig.app.json
```

The command completed with no TypeScript errors.

Final Vitest run:

```text
RUN  v2.1.9 C:/Users/Asus/Documents/se-practice/sis-04/app

✓ src/booking.test.ts (19)
✓ src/filter.test.ts (5)
✓ src/roomBooking.test.ts (3)

Test Files  3 passed (3)
     Tests  27 passed (27)
  Start at  23:05:42
  Duration  776ms
```

Final result: **3/3 test files passed and 27/27 tests passed.**

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How the value was obtained |
| --- | --- | --- | --- |
| Automated tests passed / total | 19/19 | 27/27 | Taken from the real Vitest baseline run in §1.1 and the final `npx vitest run` output in §6.3. |
| Duplicated or overlapping locations identified in §5.3 | 3 identified locations | 0 of those identified duplications remain | Compared the locations listed in §5.3 with the final code and `git diff 45e952d..HEAD -- sis-04/app/src`. The duplicated availability validation was removed, `sampleData.ts` was deleted, and room-related domain types were consolidated. |
| Code structure in `app/src` | 9 tracked files; room data was in `sampleData.ts` and there was no separate room filtering module | 12 tracked files; `rooms.ts`, `filter.ts`, `booking.ts` and `App.tsx` have separate responsibilities | Obtained with `git ls-tree -r --name-only 45e952d -- sis-04/app/src` for the baseline and `git ls-tree -r --name-only HEAD -- sis-04/app/src` for the final version, then interpreted using the responsibilities documented in §5.1. |
| Remaining limitation | The baseline displayed detailed reasons through `checkAvailability()` but duplicated booking validation rules | The final version has one booking decision path, but an unavailable result now uses a more general message instead of always giving the exact failed booking rule | Verified by reviewing the final `App.tsx`, `booking.ts` and `bookingLogic.ts` after centralising availability decisions. This is a real trade-off introduced by the refactoring rather than a hypothetical future improvement. |

The final source diff was also inspected with:

```text id="ybybe0"
git diff --stat 45e952d..HEAD -- sis-04/app/src
```

It reported:

```text id="12u3fe"
10 files changed, 440 insertions(+), 114 deletions(-)
```

I use this only as supporting evidence of the changes made, not as a claim that more lines automatically mean better code quality.

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** GPT-5.6 Sol
**Date:** 2026-11-10
**Purpose:** Analyse the Week 08 starting codebase before editing app/src, identify maintainability risks, and create a small-step improvement plan.

**Prompt:**

```text
I am extending my existing Smart Campus Room Availability Checker for SIS #04. Do not write or rewrite code yet. I need a codebase analysis and a small-step improvement plan before I edit app/src.

Repository map:

app/src/\
├── App.tsx — main React UI; room selection, time form, availability result and timeline rendering.\
├── booking.ts — canBook() implements the core AC1–AC5 booking decision rules.\
├── bookingLogic.ts — time conversion, overlap helper and checkAvailability() with user-facing reasons.\
├── sampleData.ts — current fictional rooms and bookings stored as separate arrays.\
├── types.ts — Room, Booking, CheckResult and FormState TypeScript types.\
├── booking.test.ts — existing Vitest regression suite for canBook; baseline has 19 passing tests.\
├── main.tsx — React application entry point.\
└── index.css — global styles.

app/package.json — Vite/React/TypeScript project scripts and dependencies, including Vitest.

Existing requirements that must remain unchanged:

AC1 — Reject start ≥ end and requests in the past.\
AC2 — Enforce the maximum allowed duration of 120 minutes.\
AC3 — Reject a blocked room.\
AC4 — Reject overlapping bookings but allow bookings that only touch at endpoints.\
AC5 — Return Available / Unavailable without changing booking data.\
AC6 — Provide clear, responsive feedback on desktop and mobile.

New requirements:

F1 — Capacity filter: room capacity must be greater than or equal to requested attendees.\
F2 — Equipment filter: the room must contain ALL selected required equipment.\
F3 — A blocked room can never be reported available.\
F4 — Show a clear empty state when no rooms match the filters.\
F5 — Changing the selected room must refresh the result, and the availability check must use that selected room's own bookings.

Constraints:

- At least four fictional rooms.
- Every room must have id, name, capacity, equipment, blocked status and its own bookings.
- No login.
- No payments.
- No live APIs.
- No database.
- Fictional data only.
- Final modules must separate rooms, booking rules, filtering logic and UI.
- canBook behaviour for AC1–AC5 must not change.
- Avoid a full rewrite.
- Make changes in small, testable steps.

Please:

1. Identify at least three maintainability risks in this starting structure. For each risk, name the specific file or function and explain what evidence I should verify in the current code.
2. Give me a numbered improvement plan ordered from the smallest and safest change to larger refactoring steps.
3. Point out at least one tempting suggestion that I should reject or modify because it could violate an AC, F-rule, or the assignment constraints.

Do not provide implementation code yet.
```

**Output used:**

```text
The assistant identified these main risks:

booking.ts and bookingLogic.ts could duplicate booking validation and drift apart.

sampleData.ts stored rooms and bookings separately, which could make room-specific availability harder to maintain.

App.tsx had too many responsibilities including selection, booking lookup, time conversion, availability coordination and rendering.

The existing types and tests did not yet cover the new capacity/equipment requirements.

The assistant proposed an incremental plan: preserve the baseline, extend the room model, separate filtering, connect room-specific availability, integrate the UI in small steps, and run the full suite after each change.
```

**Problems found:** One suggested architecture used names such as roomFilters.ts and kept some older module boundaries. I modified this because SIS #04 requires the fixed final names rooms.ts, filter.ts and booking.ts.

The assistant also suggested that changing the selected room might leave a stale result. I checked the actual App.tsx and found that the room change handler already cleared the current result, so I did not report that as a confirmed bug.
**Changes made:** Kept the required filenames from the assignment instead of adopting alternative AI module names.

Added rooms.ts as the room catalog and domain model.

Added filter.ts for capacity and ALL-equipment filtering.

Added checkRoom() to booking.ts.

Integrated the new modules into App.tsx incrementally instead of rewriting the page.

Added new tests before or alongside the feature changes and reran the full suite after each major step.
**Verified by:** The analysis and plan were committed before the first feature edits in commit:

fde761b  sis-04: analysis and plan

The baseline remained:

19 passed (19)

After the feature extension and refactoring, the final suite reported:

27 passed (27)

### 8.2 Exchange 2

**Tool and model:** ChatGPT and GPT-5.6 Sol
**Date:** 2026-11-10
**Purpose:** Review the planned refactoring and identify the smallest safe way to remove duplicated availability logic.

**Prompt:**

```text
Review this refactoring plan for my SIS #04 Smart Campus Room Availability Checker.

Current structure:
- rooms.ts owns Room and ROOMS
- filter.ts owns filterRooms()
- booking.ts owns canBook() and checkRoom()
- bookingLogic.ts currently also contains checkAvailability()
- App.tsx calls both checkRoom() and checkAvailability()

Requirements:
- AC1–AC5 behaviour must remain unchanged.
- UI must not contain booking rules.
- Duplicated validation logic should be reduced.
- Avoid a full rewrite.

Question:
Is keeping both canBook() and checkAvailability() as independent availability decision paths a maintainability risk? Recommend the smallest safe refactoring, and explain what I should verify after the change. Do not rewrite the whole app.
```

**Output used:**

```text
“Keeping canBook() and checkAvailability() as independent availability decision paths is a maintainability risk.”

“The smallest safe refactoring is to make canBook() the single source of truth for booking decisions.”

“Keep checkRoom() if it performs useful room lookup or data adaptation. It should reuse canBook() rather than implement separate booking rules.”

The assistant also recommended verifying AC1–AC5, UI consistency, mutation behaviour, touching endpoints and the existing Vitest regression suite after refactoring.
```

**Problems found:** The assistant suggested preserving detailed rejection reasons, potentially through a shared structured validation result. I did not implement that larger design because it would require additional changes beyond the smallest refactoring needed for SIS #04. The review was also based on the architecture description rather than a direct line-by-line inspection of the code.
**Changes made:** Removed duplicated availability decision logic from bookingLogic.ts.

Kept canBook() as the authoritative AC1–AC5 decision function.

Kept checkRoom() as the room-specific entry point that delegates to canBook().

Updated App.tsx so it no longer independently applies booking rules.

Removed the obsolete sampleData.ts.

Consolidated the room domain model in rooms.ts.

Used a general unavailable UI message instead of duplicating the booking rules only to produce detailed rejection reasons.
**Verified by:** I ran:

npm run typecheck
npx vitest run

TypeScript completed without errors and the final Vitest result was:

Test Files  3 passed (3)
Tests       27 passed (27)

This verified that the refactoring did not break the tested AC1–AC5 behaviour.

### 8.3 Exchange 3

**Tool and model:** GPT-5.6 Sol
**Date:** 2026-11-10
**Purpose:** Review the final automated test coverage and identify what evidence must be verified before submission.

**Prompt:**

```text
Review my SIS #04 automated test coverage without writing new code.

Current final suite:
- booking.test.ts: 19 tests
- filter.test.ts: 5 tests
- roomBooking.test.ts: 3 tests
- total: 27 tests

Required IDs:
AC1–AC5
F1–F5
B1–B6
INT

Important requirements:
- B1 exactly 120 minutes must be true
- B2 121 minutes must be false
- B3 touching an existing booking must be true
- B4 overlapping must be false
- B5 capacity exactly equal to attendees must be included
- B6 one below capacity must be excluded
- INT must combine filterRooms and checkRoom
- no mocks, skip, only, todo or test.each

Tell me what evidence I should verify in the test files and final Vitest output before submission. Do not invent test results and do not write replacement code.
```

**Output used:**

```text
“Passing test counts alone do not prove complete requirement coverage.”

The assistant recommended verifying the actual assertions for AC1–AC5, F1–F5 and B1–B6, confirming that the INT test really passes the output of filterRooms() into the checkRoom() workflow, checking for prohibited constructs such as mocks, .skip, .only, .todo and test.each, and then running the final Vitest suite.

It also warned that the reported 19 + 5 + 3 = 27 distribution was internally consistent but should not be treated as proof until the actual files and final run were checked.
```

**Problems found:** The assistant had not inspected the source files and therefore could not certify the test coverage itself. It also noted that it did not know the exact F1–F5 definitions from the prompt, so those requirements still had to be checked against the assignment specification.

I did not treat the AI checklist as evidence. I compared the test IDs and expected values with the SIS #04 requirements and used the actual Vitest run as the final test evidence.
**Changes made:** Checked that AC1–AC5 remained covered by the existing regression suite.

Added and kept explicit boundary IDs B1–B4 on the appropriate booking tests.

Verified F1, F2, F4, B5 and B6 through filterRooms().

Verified F3 and F5 through checkRoom().

Kept an INT test that filters rooms and then checks one of the returned rooms with checkRoom().

Kept expected results derived from the written requirements rather than from the current implementation output.
**Verified by:** The final suite was executed with:

npx vitest run

The real output was:

Test Files  3 passed (3)
Tests       27 passed (27)

The three files reported were:

src/booking.test.ts     (19)
src/filter.test.ts      (5)
src/roomBooking.test.ts (3)

I also ran npm run typecheck, which completed without TypeScript errors.

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| none | Final checker run: 33 PASS, 0 FAIL, 0 ERROR. |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

## 10. AI reflection

During this assignment I gave the AI assistant detailed context about my existing Smart Campus Room Availability Checker. I provided the repository structure, the original AC1–AC6 requirements, the new F1–F5 requirements, the constraints of the task, and information about the existing 19 passing tests. This helped the AI understand that I needed to extend the existing project instead of rewriting it.

Some AI suggestions were useful, especially separating room data, filtering logic, booking rules and UI into different modules. The suggestion to make `canBook()` the main source of truth for availability was also useful because it reduced duplicated validation logic. However, not every suggestion was correct for the assignment. For example, the AI initially suggested different module names, but I kept the required `rooms.ts`, `filter.ts` and `booking.ts` names.

I personally verified the changes by reading the code, running `npm run typecheck`, running the complete Vitest suite, checking the application in the browser and creating the required screenshots. I did not rely only on the AI saying that the solution was correct.

Tests strongly influenced my decisions. After each important change I checked that the original AC rules were still working. The final suite increased from 19 tests to 27 tests while all tests remained passing.

If I improved the project again, I would keep the centralized booking decision but add more detailed user-facing rejection reasons without duplicating the booking rules.
