# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | ChatGPT |
| Coding assistant model | GPT-5.6 Sol |
| Bolt.new model | not displayed |
| Bolt project link | https://bolt.new/~/sb1-3qzqwxxp |
| Language | Python |
| Path | A |
| Python v1 from | week-05 |
| Web v1 from | week-06 |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** One responsive page for a single selected room. The student enters a start and an end
time, and the page says whether that interval is Available or Unavailable, using
fictional bookings only. It checks availability and never creates or confirms a booking.
Login, database, backend, external API, payments and unrelated features are excluded.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Start and end are whole minutes with 0 <= start < end <= 1440, and start is strictly after now. |
| AC2 | The interval is at most 120 minutes; exactly 120 is allowed. |
| AC3 | If the room is blocked, every request is rejected. |
| AC4 | A request overlapping any booking is rejected; intervals that only touch at an endpoint do not overlap. |
| AC5 | The result is clearly Available or Unavailable, and existing bookings are never changed. |
| AC6 | Invalid input gets understandable feedback, and the layout is usable on a narrow mobile screen. |


### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Off-by-one at boundaries: using <= instead of < for touching bookings, rejecting exactly 120 minutes, or accepting start == now or end > 1440 | AC1, AC2, AC4 | Test pairs on both sides of each boundary: 120 vs 121 minutes, start == now vs now + 1, end 1440 vs 1441, a booking touching at an endpoint |
| 2 | Incomplete overlap logic: only checking whether the new start or end lies inside a booking, and missing a request that fully contains an existing booking | AC4 | Test a request that fully contains a booking, one that is fully inside a booking, and partial overlaps from the left and the right |


### 2.4 The contract

`can_book(start, end, now, blocked, existing) -> True only when AC1-AC4 hold`

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| start | Requested start time | integer minutes since midnight, 0 <= start < end |
| end | Requested end time | integer minutes since midnight, start < end <= 1440 |
| now | Current time | integer minutes since midnight, same day |
| blocked | Whether the room is blocked | boolean |
| existing | Existing bookings of the selected room | list of (start, end) integer pairs, 0 <= start < end <= 1440 |
| returns | Whether the request can be booked | boolean; True only when AC1-AC4 all hold; `existing` is not modified |


### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. `now`, `start` and `end` are minutes since midnight on the same day, so no booking crosses midnight.
2. `existing` contains only valid (start, end) pairs in the same units, and `blocked` is a boolean.


**Checked manually:**
- I tried to execute the current `can_book` template with a boundary example. The current template raises `NotImplementedError`, so no booking behaviour has been confirmed yet.


## 3. Python v1 review

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if not (0 <= start < end <= 1440):` | AC1 | Yes | It rejects negative start times, zero-length or reversed intervals, and any end time after 1440. |
| `if start <= now:` | AC1 | Yes | AC1 requires the start time to be strictly after `now`, so a request starting now or earlier must be rejected. |
| `if end - start > 120:` | AC2 | Yes | It rejects requests longer than 120 minutes while allowing exactly 120 minutes. |
| `if blocked:` | AC3 | Yes | If the selected room is blocked, the function immediately rejects the request. |
| `if start < existing_end and end > existing_start:` | AC4 | Yes | This detects real overlap while allowing intervals that only touch at an endpoint, because equality does not satisfy the overlap condition. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Build a small responsive Smart Campus Room Availability Checker. Requirements: AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time. AC2: Reject a booking longer than 120 minutes. AC3: Reject the request when the selected room is blocked. AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed. AC5: Show a clear Available / Unavailable decision without changing the existing booking data. AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback. Use fictional sample data only. Keep the implementation simple and within one-page scope. Do not add authentication, backend services, analytics, or unrelated features. After building, briefly list the main files/components you created.
~~~~

| Generated file or component | Path | Its role |
| --- | --- | --- |
| App | `src/App.tsx` | Main page UI with the room selector, time inputs, availability result and room schedule. |
| Booking logic | `src/bookingLogic.ts` | Contains the core availability checks for the acceptance criteria. |
| Sample data | `src/sampleData.ts` | Stores the fictional rooms and existing bookings used by the prototype. |
| Types | `src/types.ts` | Defines the room, booking and result data structures used by the page. |

**What v1 does:**

- The page loads as a Smart Campus Room Availability Checker.
- It provides a room selector and Start Time / End Time inputs.
- It shows a current-time reference and an `Update now` control, but there is no editable field for supplying an arbitrary current time.
- It provides `Check Availability` and `Reset` controls.
- It displays booking rules and a Room Schedule area for the selected room.
- It uses fictional sample data and does not save or modify bookings.

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->
| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Not testable | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Not testable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Not testable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Not testable | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Not testable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | False | False | Not testable | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Not testable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Not testable | Not testable |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Not testable | Not testable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Not testable | Unavailable |
| T11 | Same check twice | 660–720, twice | Available | True | True | Not testable | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Not testable | Available |
## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->
| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | `code/booking.py`; `web/final/src/bookingLogic.ts`; current-time input in `web/final/src/App.tsx` | T1, T6, T7, T8, T9 | Valid ordered in-day interval starting after `now`; T1/T8 Available, T6/T7/T9 Unavailable | Python v1 matched the expected Boolean results; page v1 was Not testable because supplied `now=09:00` could not be set | Python final matched all cases; page final matched T1/T6/T7, while T8/T9 were Not testable because native time fields cannot enter 24:00/24:01 |
| AC2 | `code/booking.py`; `web/final/src/bookingLogic.ts` | T4, T5 | T4 Available; T5 Unavailable | Python v1: T4 True, T5 False; page v1 Not testable | Python final: T4 True, T5 False; page final: T4 Available, T5 Unavailable |
| AC3 | `code/booking.py`; `web/final/src/bookingLogic.ts` | T3 | Unavailable | Python v1 False; page v1 Not testable | Python final False; page final Unavailable |
| AC4 | `code/booking.py`; `web/final/src/bookingLogic.ts`; fixtures in `web/final/src/sampleData.ts` | T1, T2, T10 | T1 Available; T2 and T10 Unavailable | Python v1: True, False, False; page v1 Not testable | Python final: True, False, False; page final: Available, Unavailable, Unavailable |
| AC5 | `code/booking.py`; `web/final/src/bookingLogic.ts` | T11 and `test_existing_input_is_unchanged` | Same result on repeated check and existing booking data unchanged | Python v1 returned True on the second call; page v1 Not testable | Python final returned True; page final remained Available on the second check and the existing schedule did not change |
| AC6 | Responsive layout in `web/final/src/App.tsx` | T12 at approximately 375 px width | Available and usable at narrow/mobile width | Page v1 Not testable for the exact T1 setup | Page final was Available and remained usable at narrow width |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->
| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | The page did not contain the complete fictional booking fixture required to execute T10 exactly. | T10 requires candidate `(720,780)` with existing bookings `(600,660)` and `(700,760)`. The original sample data did not provide both bookings together for a selectable room. | High | Focused Repair prompt asked for the smallest change without modifying the availability logic or breaking Newton Lab tests. Added a separate `T10 Test Room` in `sampleData.ts` with exactly the two required bookings. | Retested with now `09:00`, start `12:00`, end `13:00`. Result was **Unavailable** because it overlaps the `11:40–12:40` booking. T10 now passes. |
| 2 | The v1 UI stated that time could be within `00:00–24:00`, although the native browser time fields only allow values through `23:59`, making the wording misleading for T8/T9. | T8 (`end = 24:00`) and T9 (`end = 24:01`) cannot be entered exactly using the native time inputs. | Medium | Focused usability prompt explicitly said not to change the booking logic or replace the native controls. Changed only the Booking Rules wording in `App.tsx` to explain that browser time fields accept `00:00–23:59` and that exact `24:00` cannot be entered in this UI. | Reloaded the final page and confirmed the new clarification is visible. T8 and T9 remain honestly recorded as **Not testable** rather than pretending the UI supports those values. |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 2: the v1 page presented the misleading `00:00–24:00` rule, while the final page clearly explains the native input limitation.

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | Keep the final Python `can_book` implementation unchanged. | I ran `python -m unittest -v`; all 18 tests passed, and the SIS checker passed F1-F10. | accept | AC1-AC5 and T1-T11 are already satisfied by the Python final. |
| 2 | The final web page correctly handles the tested core rules. | I manually executed T1-T7 and T11 on the final page and observed the expected Available / Unavailable results. | accept | The observed results matched AC1-AC5. |
| 3 | Add the missing `(700,760)` booking to Newton Lab so T10 can be tested. | I checked the existing Newton Lab data and also considered T1, which requires Newton Lab to have only the `(600,660)` booking for the touching case. | modify | Adding `(700,760)` directly to Newton Lab would make T1 overlap and break its expected Available result. I will instead use a separate fictional room/test fixture for T10 so the other cases remain unchanged. |
| 4 | No responsive-layout repair is needed. | I ran T12 at 375 px width and observed an Available result with usable controls. | accept | AC6 and T12 passed at narrow width. |

## 9. Coding-agent analysis

### 9.1 The loop

| Step | What happened in this assignment |
| --- | --- |
| User goal | I needed the final web page to execute T10 exactly without breaking the other acceptance-criteria cases. |
| Model / plan | The assistant reviewed the missing T10 fixture and proposed a minimal plan: keep Newton Lab unchanged and add a separate fictional room containing the two required bookings `(600,660)` and `(700,760)`. |
| Tool call | I edited `web/final/src/sampleData.ts`, added `T10 Test Room` and its two fictional bookings, then ran the Vite page in the browser. |
| Observation | With current time `09:00`, start `12:00` and end `13:00`, the page returned **Unavailable** and showed that the request overlaps the `11:40–12:40` booking. |
| Next step | I recorded T10 as `Unavailable` in the final page results and kept the Python and availability logic unchanged. |
| Human review | I checked that Newton Lab was not modified, confirmed T10 manually in the browser, and verified that the repair stayed within the required one-page scope. |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->


| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| ChatGPT | AC1–AC6, T1–T12 results, my screenshots, report requirements, and the code snippets I provided. | It could analyse the supplied information and suggest focused changes, but it did not directly edit my local repository. I applied the changes myself in VS Code. | Observed |
| Bolt.new | The Smart Campus page prompt, room-booking requirements, and fictional sample-data scope. | It appeared to generate and modify the React/Vite project files inside its own workspace to produce the prototype. I did not inspect its internal execution process. | Assumed |
| VS Code + PowerShell / Vite | The local `sis-03` project files on my computer. | I edited files such as `sampleData.ts` and `App.tsx`, ran commands such as `npm run dev`, and viewed the local application in the browser. | Observed |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before accepting an AI-generated repair, I checked which files would change, whether the change affected the fixed acceptance criteria, and whether it introduced any new backend, storage, authentication, network calls, or unrelated functionality. I only applied the change after confirming that it was small, local, and inside the required scope.

**Reliability, security, responsibility:** This workflow showed that AI suggestions still need human verification. Reliability depends on running the required tests and checking boundary cases instead of trusting generated code. Security depends on limiting permissions and avoiding unnecessary services, storage, or network features. Human responsibility remains important because I decide which AI suggestions to accept, reject, or modify, I run the final tests, and I am responsible for the submitted result.

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

In this assignment, I noticed a clear difference between AI-assisted coding and vibe coding. In the Python part, I worked with a small function and clear acceptance criteria, so it was easier to check every condition with tests. With Bolt, the process was faster and more visual, but it was also easier to miss small problems in the generated interface or sample data.

One reliability risk was incorrect boundary or overlap logic. A usability risk was that the browser time input could not enter 24:00 even though the original page text suggested it was possible. A security risk would be allowing unnecessary backend, storage, or network features.

I also learned that AI suggestions should not be accepted automatically. For example, adding the second T10 booking directly to Newton Lab would have broken T1, so I modified the idea and used a separate test room. Tests, permissions, review, and the final decision still remain human responsibilities.

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->


### B1

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-10-06
- **Stage:** Plan
- **Source:** week-05

**Prompt:**

~~~~text
Propose a short implementation plan for can_book. List the checks in order and identify assumptions. Use Python 3 and the supplied rules. Do not write code yet. Suggest boundary cases that could expose an incorrect implementation.
~~~~

**Response:**

~~~~text
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

| Case | Example | Expected |
| --- | --- | --- |
| Earliest possible valid start | `now=0, start=1, end=2` | `True` if otherwise clear |
| Start exactly now | `now=600, start=600, end=660` | `False` |
| Start one minute after now | `now=600, start=601, end=660` | `True` if otherwise clear |
| Negative start | `start=-1, end=60` | `False` |
| Start equals end | `start=600, end=600` | `False` |
| Start after end | `start=700, end=600` | `False` |
| End exactly 1440 | `start=1380, end=1440` | Valid range |
| End above 1440 | `start=1380, end=1441` | `False` |
| Duration exactly 120 | `start=600, end=720` | Valid duration |
| Duration 121 | `start=600, end=721` | `False` |
| Blocked room | `blocked=True` | `False` |
| No existing bookings | `existing=[]` | `True` if AC1–AC3 pass |
| Ends when booking starts | request `(600,660)`, existing `(660,720)` | `True` |
| Starts when booking ends | request `(720,780)`, existing `(660,720)` | `True` |
| One-minute overlap | request `(600,661)`, existing `(660,720)` | `False` |
| Request inside existing | request `(630,660)`, existing `(600,700)` | `False` |
| Existing inside request | request `(600,720)`, existing `(630,660)` | `False` |
| Same interval | request `(600,720)`, existing `(600,720)` | `False` |
| Multiple bookings, one overlap | only one tuple overlaps | `False` |
| Input mutation check | save copy of `existing`, call function | `existing` must remain identical |

The most important bug-catching cases are the **touching endpoints**, **exactly 120 minutes vs. 121 minutes**, and **`start == now` vs. `start == now + 1`**.
~~~~

### B2

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-10-06
- **Stage:** Generate
- **Source:** week-05

**Prompt:**

~~~~text
Implement can_book in booking.py using the supplied contract and AC1-AC5. Keep the signature. Use only the standard library. Do not modify existing. Return the function and explain each condition. Keep the feature within the stated scope.
~~~~

**Response:**

~~~~text
def can_book(start, end, now, blocked, existing):
    # AC1: Requested interval must be valid and start in the future.
    if not (0 <= start < end <= 1440):
        return False

    if start <= now:
        return False

    # AC2: Booking duration must be at most 120 minutes.
    if end - start > 120:
        return False

    # AC3: A blocked room cannot be booked.
    if blocked:
        return False

    # AC4: Requested interval must not overlap any existing booking.
    # Intervals are [start, end), so touching endpoints are allowed.
    for existing_start, existing_end in existing:
        if start < existing_end and end > existing_start:
            return False

    # AC5: True only if AC1-AC4 all passed.
    return True
~~~~

### B3

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-10-31
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
Review my SIS #03 Smart Campus Room Availability Checker against the fixed AC1-AC6.

Review both:
1. the final Python can_book function,
2. the final Bolt web page.

Do not edit any code yet.

Use the evidence already observed in this assignment:
- Python final passes the full 18-test suite.
- T1-T7 and T11 on the final page matched the expected results.
- T8 and T9 cannot be entered exactly because the native time input does not allow 24:00 or 24:01.
- T10 requires existing bookings (600,660) and (700,760), but the current Newton Lab sample data contains only (600,660).
- T12 worked at 375 px width.
- Repeating T11 did not change the booking data.

Give at least three concrete claims or recommendations.
For each one, name the relevant AC or test case.
Separate confirmed defects from optional improvements.
Do not add features outside the stated scope.
~~~~

**Response:**

~~~~text
## Critique — SIS #03 Smart Campus Room Availability Checker

### Confirmed findings

| # | Claim / recommendation | Related AC / case | Assessment |
|---|---|---|---|
| 1 | The final Python `can_book` implementation should be kept unchanged. | AC1–AC5; T1–T11 | No confirmed Python defect. The final function passed the complete 18-test suite, including boundaries, overlap, blocked-room handling, repeated checks, and preservation of the existing bookings. Changing working logic now would add unnecessary risk. |
| 2 | The final web page correctly handles the tested core availability rules. | AC1–AC5; T1–T7, T11 | Confirmed working behavior. T1 touching endpoints was Available; T2 overlap was Unavailable; T3 blocked room was Unavailable; T4 exactly 120 minutes was Available; T5 121 minutes was Unavailable; T6 starting at `now` was Unavailable; T7 reversed time was Unavailable; and T11 remained Available on the second check without changing the booking data. |
| 3 | The web test data does not allow the exact T10 scenario to be reproduced. | AC4; T10 | Confirmed test-fixture gap. T10 requires existing bookings `(600,660)` and `(700,760)`, but Newton Lab currently contains only `(600,660)`. Therefore the exact required second-booking overlap case cannot currently be executed through the page. The smallest justified repair is to add the missing fictional booking to the relevant sample data, without changing the availability rule itself. |
| 4 | The final page is usable at narrow width. | AC6; T12 | Confirmed working behavior. At approximately 375 px width, the controls remained usable and the T1 scenario still produced Available. No responsive-layout defect was observed. |

### Optional improvements

T8 and T9 cannot be entered exactly because the native time control does not accept `24:00` or `24:01`. This is a testability limitation, not a confirmed AC defect, because the assignment explicitly permits these page cases to be recorded as `Not testable`. A custom end-of-day input could make them executable, but I would not recommend adding it unless required, because it would increase implementation complexity without fixing an observed failure in the required final behavior.

The final page could also display more explicit technical details about why a request failed, but the observed messages for overlap, blocked rooms, excessive duration, starts-now, and reversed time are already understandable. Under AC6, this is an optional usability refinement rather than a required repair.
~~~~

### B4

- **Tool:** ChatGPT
- **Model:** GPT-5.6 Sol
- **Date:** 2026-11-01
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text id="y41p9c"
Make the smallest repair needed so the final web page can execute T10 exactly.

Current problem:
T10 requires the candidate interval 720–780 with existing bookings (600,660) and (700,760), and the expected result is Unavailable.

Do not add (700,760) to Newton Lab, because Newton Lab is also used for T1 and that would make T1 overlap and change its expected Available result.

Instead, add one separate fictional room/test fixture in the existing sample data with exactly these two bookings:
- (600,660)
- (700,760)

The room must be selectable through the existing UI so I can run T10 manually with:
- now = 540
- start = 720
- end = 780
- blocked = false

Make only the minimum required change. Do not change the availability logic, do not add backend, database, storage, login, analytics or unrelated features.

Tell me exactly which file and lines/content to change, and explain why the other existing test cases remain unaffected.
~~~~

**Response:**

~~~~text id="4um6dn"
For B4 / Repair, make only one change in:

sis-03/web/final/src/sampleData.ts

Do not change bookingLogic.ts, App.tsx, or other files.

Add one new fictional room:

{ id: 'r6', name: 'T10 Test Room', location: 'Building F · Floor 1', capacity: 20, blocked: false },

Then add exactly two bookings for that room:

{ id: 'b7', roomId: 'r6', start: 600, end: 660, title: 'T10 Existing Booking 1', bookedBy: 'Test Fixture' },
{ id: 'b8', roomId: 'r6', start: 700, end: 760, title: 'T10 Existing Booking 2', bookedBy: 'Test Fixture' },

Then execute T10 with:

Room: T10 Test Room
Current time: 09:00
Start: 12:00
End: 13:00
Expected: Unavailable

The candidate interval 12:00–13:00 (720–780) overlaps the second booking 11:40–12:40 (700–760).

Newton Lab remains unchanged, so the existing T1–T7 and T11 cases are unaffected. The availability logic is also unchanged; only a separate fictional test fixture is added.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

~~~~text id="d3g7kv"
test_blocked_room_is_rejected (test_booking.BookingTests.test_blocked_room_is_rejected) ... ok
test_earliest_future_minute_is_allowed (test_booking.BookingTests.test_earliest_future_minute_is_allowed) ... ok
test_empty_existing_is_allowed (test_booking.BookingTests.test_empty_existing_is_allowed) ... ok
test_end_after_1440_is_rejected (test_booking.BookingTests.test_end_after_1440_is_rejected) ... ok
test_end_exactly_1440_is_allowed (test_booking.BookingTests.test_end_exactly_1440_is_allowed) ... ok
test_exactly_two_hours_is_allowed (test_booking.BookingTests.test_exactly_two_hours_is_allowed) ... ok
test_existing_input_is_unchanged (test_booking.BookingTests.test_existing_input_is_unchanged) ... ok
test_identical_interval_is_rejected (test_booking.BookingTests.test_identical_interval_is_rejected) ... ok
test_multiple_existing_bookings_are_checked (test_booking.BookingTests.test_multiple_existing_bookings_are_checked) ... ok
test_over_two_hours_is_rejected (test_booking.BookingTests.test_over_two_hours_is_rejected) ... ok
test_overlap_is_rejected (test_booking.BookingTests.test_overlap_is_rejected) ... ok
test_request_contains_existing_is_rejected (test_booking.BookingTests.test_request_contains_existing_is_rejected) ... ok
test_request_inside_existing_is_rejected (test_booking.BookingTests.test_request_inside_existing_is_rejected) ... ok
test_reversed_time_is_rejected (test_booking.BookingTests.test_reversed_time_is_rejected) ... ok
test_starting_now_is_rejected (test_booking.BookingTests.test_starting_now_is_rejected) ... ok
test_touching_before_existing_is_allowed (test_booking.BookingTests.test_touching_before_existing_is_allowed) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_zero_length_is_rejected (test_booking.BookingTests.test_zero_length_is_rejected) ... ok

----------------------------------------------------------------------
Ran 18 tests in 0.003s

OK
~~~~
### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->
| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| None | The final checker run is clean: all 55 checks pass and there are no known failing checks. | No corrective action is required before submission. |