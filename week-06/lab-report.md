# Week 06 — Lab report

**Name:** Izbassarov Darkhan
**Group:** Monday 16:00-19:00 [CSCI-2208]
**Date:** 2026-10-15

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Tool | Bolt.new |
| Exact model (as Bolt shows it, or `not displayed`) | pending |
| Bolt project link (or `not shared`, and why) | pending |
| Browser and version | Google Chrome 155 |
| If you could not use Bolt.new: the tool you used instead, and why | N/A — Bolt.new will be used |

---

## 2. Task 1 — define before generating

**Two predictions, written BEFORE you send the first prompt.** Where do you expect v1 to go wrong?
Fill the first three columns now; fill the last one after Task 3.

| # | What I expect to go wrong | AC it concerns | Was I right? (after Task 3) |
| --- | --- | --- | --- |
| 1 | I expect v1 to treat a booking that starts exactly when another booking ends as an overlap, even though touching endpoints should be allowed. | AC4 | pending |
| 2 | I expect v1 to handle the 24:00 end-of-day case poorly because normal time inputs usually stop at 23:59. | AC1, AC6 | pending |

**The initial prompt exactly as I sent it** — the deck's prompt with AC1–AC6 pasted in place of
`[paste AC1–AC6]`, nothing else changed:

```text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
```

---

## 3. Task 2 — prototype v1

v1 export saved in `original/` and screenshot saved as `evidence/v1.png` **before** any cleanup
prompt: yes 
**Bolt's list of the files/components it created, pasted unedited:**

```text
src/types.ts — Type definitions for rooms, bookings, and check results
src/sampleData.ts — Fictional sample rooms and bookings
src/bookingLogic.ts — Core validation logic (all acceptance criteria)
src/App.tsx — Full UI: room selector, time inputs, result panel, and visual timeline
```

**What v1 does — one line per thing that works, or visibly does not:**

- The page loads successfully and shows a working Smart Campus Room Availability Checker.
- It provides a room selector and Start Time / End Time inputs.
- It shows a current-time reference automatically and provides an "Update now" control; there is no visible input for entering an arbitrary current time.
- It provides Check Availability and Reset buttons.
- It shows booking rules and a Room Schedule area for the selected room.
- The page states that the sample data is fictional and that bookings are not saved or modified.

**Repair prompt** (only if the first build did not run — the deck allows one, then the result is
v1). Leave empty if you did not need it:

```text
```

---

## 4. Task 3 — the nine cases

Base for every case unless the row says otherwise: **current time 09:00**, room **not blocked**,
the room's **only booking 10:00–11:00**. The Expected column comes from AC1–AC6 — do not change it.
Write each result exactly as **Available**, **Unavailable** or **Not testable** (the page gives you
no way to set up the case). Save each final run as `evidence/final-T<n>.png`.

| T1 | Touching | 11:00–12:00 | Available | AC4 | Not testable | Available | final-T1.png |
| T2 | Overlap | 10:30–11:30 | Unavailable | AC4 | Not testable | Unavailable | final-T2.png |
| T3 | Blocked | 11:00–12:00, room blocked | Unavailable | AC3 | Not testable | Unavailable | final-T3.png |
| T4 | Exactly 2 hours | 12:00–14:00 | Available | AC2 | Not testable | Available | final-T4.png |
| T5 | Over 2 hours | 12:00–14:01 | Unavailable | AC2 | Not testable | Unavailable | final-T5.png |
| T6 | Starts now | 09:00–09:30 (current time 09:00) | Unavailable | AC1 | Not testable | Unavailable | final-T6.png |
| T7 | Reversed times | 12:00–11:00, and the page says why | Unavailable | AC1, AC6 | Not testable | Unavailable | final-T7.png |
| T8 | Same check twice | T1, then T1 again without reloading | Available | AC5 | Not testable | Available | final-T8.png |
| T9 | Narrow screen | T1 at about 375 px wide | Available | AC6 | Not testable | Available | final-T9.png |

---

## 5. Issue log — cleanup targets

One row per issue you chose to act on (or deliberately not act on). At least **two**: one
functional and one usability or code-quality issue when you have them. If v1 passed every case,
log a justified cleanup that preserves behaviour. Save a screenshot of each as
`evidence/issue-<n>.png`.

| # | Issue | Evidence: steps → expected → observed | Priority | Decision |
| --- | --- | --- | --- | --- |
| 1 | The page does not let the user supply the current time required by AC1. | Steps: open the checker and try to set current time to 09:00. Expected: the page should let me supply 09:00 so the fixed cases can be tested. Observed: the page only shows the real current-time reference and an "Update now" control, so 09:00 cannot be entered. | High | Fix |
| 2 | The blocked room is visible but cannot be selected, so AC3 cannot be tested through the page. | Steps: open the room selector and try to choose Curie Auditorium, which is marked Blocked. Expected: the room should be selectable and the checker should return Unavailable with a clear blocked-room message. Observed: the blocked option is disabled and cannot be selected. | Medium | Fix |
| 3 | A booking that starts exactly at the supplied current time is accepted. | Steps: set current time to 09:00, select Newton Lab, request 09:00–09:30, and check availability. Expected: Unavailable because AC1 requires the start time to be after the supplied current time. Observed: the page returns Available. | High | Fix |
---

## 6. Task 4 — cleanup with focused prompts

One issue per prompt. Paste every prompt **as sent** (every `[bracketed field]` and `AC#` filled
in) and Bolt's answer, unedited.

**Functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, trying to set the supplied current time to 09:00 produces no editable current-time input; the page only shows the real current time and an "Update now" control, but AC1 requires the supplied current time to be used when deciding whether the start time is valid. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.

Let me read the relevant section of App.tsx to make the precise edit.

Read
src/App.tsx
Open
I'll replace the read-only current-time display with an editable time input so users can supply a custom current time, while keeping the "Update now" convenience.

0123456789
 actions taken
Build passes. I changed src/App.tsx — the current-time control was a read-only label with only an "Update now" button, so you couldn't supply a custom current time like 09:00. I replaced that static display with an editable time input (bound to the same currentTime state) while keeping the one-click "Set to real now" button. The validation logic in bookingLogic.ts already used currentTime for the AC1 start-time check, so no other files needed changes — the supplied current time now flows correctly into the availability decision.

Make current-time display editable
Version 2 at Oct 15 12:57 AM
```

**Further functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, setting the supplied current time to 09:00 and requesting 09:00–09:30 produces Available, but AC1 requires Unavailable because the start time must be after the supplied current time. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.

The bug is in bookingLogic.ts — the AC1 check uses < (strictly less than) but "start must be after current time" means start must be strictly greater than current time, so equal should be rejected.

0123456789
 actions taken
Build passes. I changed src/bookingLogic.ts — the AC1 boundary check used startMin < currentTime, which allowed start and current time to be equal. AC1 says start must be after the supplied current time, so I changed the comparison from < to <=. Now setting current time to 09:00 and requesting 09:00–09:30 correctly returns Unavailable, while any start time after 09:00 still passes.
```

**Further functional fix prompt, as sent, and Bolt's answer:**

```text
In the current prototype, opening the room selector and trying to select Curie Auditorium produces a disabled option that cannot be selected, but AC3 requires a request for a blocked room to be rejected as Unavailable. Make the smallest change that fixes this behavior. Preserve the other acceptance criteria. Explain which file/component you changed and why.

0123456789
 actions taken
Build passes. I changed src/App.tsx — the room selector had disabled={r.blocked} on blocked rooms, preventing them from being selected at all. I removed that disabled attribute so Curie Auditorium can now be selected, and when you check availability the existing logic in bookingLogic.ts (AC3) returns Unavailable with the blocked-room reason. The "— Blocked" label stays in the dropdown so it's still clear which rooms are blocked.
```

**Cleanup prompt, as sent, and Bolt's answer:**

```text
Review only the current-time control in src/App.tsx for unnecessary duplication, confusing naming, or UI feedback problems. Suggest one small cleanup. Do not add features or redesign the whole application. Implement it only if it preserves AC1–AC6.

Read
src/App.tsx
The one issue I see: the button label "Set to real now" is awkward and confusing — "real now" isn't a standard phrase and could make a user hesitate. Renaming it to "Reset to now" is clearer and conventional, and it's purely a text change so no acceptance criteria are affected.

0123456789
actions taken
Build passes. The one cleanup I made: I renamed the button label from "Set to real now" to "Reset to now" in `src/App.tsx`. The old phrasing was confusing — "real now" isn't a familiar term and could make users pause. "Reset to now" is the conventional way to express "sync this field back to the actual clock," and since it's only a text change, all six acceptance criteria are unaffected.
```

**Every change or suggestion Bolt made, judged.** Accepting is a decision; so is rejecting. Cite
the AC (or the scope) that justifies it.

| # | What Bolt changed or suggested | accept / reject | Reason — cite the AC or the scope | Retest: which cases, result |
| --- | --- | --- | --- | --- |
| 1 | Replaced the read-only current-time display in `src/App.tsx` with an editable time input and kept a control to set the real current time. | accept | AC1 requires the availability decision to use a supplied current time, so the page must let the user provide it. | T6 became testable, but the first retest exposed another AC1 bug: 09:00–09:30 was incorrectly Available when current time was 09:00. |
| 2 | Changed the AC1 comparison in `src/bookingLogic.ts` from `<` to `<=` so a booking cannot start exactly at the supplied current time. | accept | AC1 requires the start time to be after the supplied current time, so equality must be rejected. | T6 Unavailable; T1 Available; T2 Unavailable; T4 Available; T5 Unavailable; T7 Unavailable with explanation; T8 Available twice; T9 Available at 375 px. T3 remained Not testable at this stage. |
| 3 | Removed `disabled={r.blocked}` from the room selector in `src/App.tsx`, allowing blocked rooms to be selected while keeping the “— Blocked” label. | accept | AC3 requires the system to reject a request when the selected room is blocked. The room therefore needs to be selectable so the AC3 behaviour can be tested through the page. | T3 retest: Unavailable with a clear blocked-room reason. Full T1–T9 regression retest later completed successfully with all expected results. |
| 4 | Renamed the current-time button in `src/App.tsx` from `Set to real now` to `Reset to now`. | accept | AC6 requires understandable UI feedback. The new label is clearer, and the change does not alter the booking logic or broaden the prototype scope. | T1–T9 regression retest completed after the cleanup: all nine cases matched the expected results, including T9 at 375 px width. |

---

## 7. Change log — v1 to final

Two to four concrete changes, each one retested.

| # | Issue | Decision | Change (file or component) | Result after retest |
| --- | --- | --- | --- | --- |
| 1 | The page did not allow the user to supply the current time required by AC1. | accept | In `src/App.tsx`, Bolt replaced the read-only current-time display with an editable time input and kept a button to restore the real current time. | T6 became testable. The retest exposed a second AC1 issue where a booking starting exactly at the current time was still accepted. |
| 2 | A booking starting exactly at the supplied current time was incorrectly accepted. | accept | In `src/bookingLogic.ts`, Bolt changed the AC1 boundary comparison from `<` to `<=` so `start == current time` is rejected. | T6 returned Unavailable with the message that the start time must be after the current time. Regression tests T1, T2, T4, T5, T7, T8 and T9 also behaved as expected. |
| 3 | The blocked Curie Auditorium could not be selected, so AC3 could not be tested through the page. | accept | In `src/App.tsx`, Bolt removed the disabled state from blocked room options while keeping the “— Blocked” label. | T3 returned Unavailable with a clear blocked-room reason. The final regression run later showed all T1–T9 matching their expected results. |
| 4 | The label `Set to real now` was confusing. | accept | In `src/App.tsx`, Bolt renamed the button to `Reset to now`. | Full final regression test T1–T9 passed, including T9 at about 375 px width. |

---

## 8. One generated component, in my own words

Pick one file or component Bolt generated that matters for AC1–AC5 — the one that decides
availability is the best choice. Name its path in backticks, then explain in your own words, without
the assistant, what it does and how it decides. 60 words or more.

**File:** `(write here, e.g. src/App.tsx)`

## 8. One generated component, in my own words

**File:** `src/App.tsx`

`src/App.tsx` controls the main page of the room availability checker. It stores the selected room, start time, end time, current time, and the result shown to the user. When the user presses Check Availability, the component converts the entered times into minutes and sends them together with the selected room and its bookings to the availability checking function. It also lets the user manually change the supplied current time, which is needed for AC1. The component displays either Available or Unavailable and shows a reason when the request is rejected. It also contains the room selector, booking schedule, buttons, and responsive layout used for AC6.

---

## 9. What still fails, and what the criteria do not say

### 9.1 Checks I am keeping as FAIL or ERROR

none
### 9.2 The end of the day

The final page uses native HTML time inputs, so the user cannot directly enter 24:00 as an end time. The latest value that can be entered normally is 23:59. I decided to keep this limitation instead of adding special end-of-day handling because the prototype is intentionally small and the fixed test cases do not require 24:00. I will declare this limitation in `submission.yml` under `assumptions.end_of_day`.

### 9.3 Which "now"?

In v1, the current time came automatically from the computer clock and the user could only refresh it with the "Update now" control. This meant I could not supply the fixed current time of 09:00 required by T6, so T6 was Not testable on v1. After cleanup, the current-time field became editable, which made T6 testable and allowed the final version to reject a booking that starts exactly at the supplied current time.



---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Which of your two predictions in section 2 was right, and what did v1 actually get wrong?
     (b) Which AI suggestion did you reject, or would have been wrong to accept, and why?
     (c) What is the difference between "the prototype looks finished" and "the prototype meets
         AC1-AC6" - shown with one case from section 4?
     Worthless: "Bolt made some mistakes and I fixed them."
     Worth everything: "T8 failed on v1: the Check button also added the booking to the list, so
     checking 11:00-12:00 a second time said Unavailable. AC5 says the check must not change the
     booking data." -->

<!-- Write your conclusion below this line -->
My first prediction was wrong because v1 correctly allowed touching bookings, such as 11:00–12:00 after an existing 10:00–11:00 booking. My second prediction was right because the native time input does not directly allow 24:00. The main problems in v1 were different: I could not supply the required current time, a booking starting exactly at the current time was accepted, and a blocked room could not be selected for testing.

A suggestion that would have been wrong to accept would be adding a Book button or saving checked bookings. That would broaden the scope and could break AC5, which says checking availability must not change existing booking data.

The biggest lesson is that a prototype can look complete while still failing the acceptance criteria. For example, T6 looked simple, but v1 could not even set up the required 09:00 current time. The final version passed all nine cases only after focused fixes and retesting.
