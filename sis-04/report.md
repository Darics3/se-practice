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
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.2 Exchange 2

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
