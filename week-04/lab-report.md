# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Darkhan Izbassarov |
| Group | Monday 16:00-19:00 |
| AI assistant | ChatGPT |
| Exact model | GPT-5.6 Sol |
| Renderer | PlantUML web server |
| Behaviour diagram | activity |
| Stories used | my week-03 stories, revised |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.


### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.
```
### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
Generate a UML activity diagram in PlantUML for Book room. Show the initial node, actions, guarded decisions, and final nodes. Check the time range, blocked-room status, and overlapping bookings. Show confirmation after success and rejection after failure. Use branches rather than parallel paths unless concurrency is required.
```

### 2.4 Focused correction prompts (if you sent any)

```text
none
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```
---

## 3. Task 1 — use-case review

**Assumptions the AI listed:**

- The system boundary is named Smart Campus Study Room Booking System.
- A Student can cancel only a booking they made, based on US-03.
- Room availability is a separate user goal and is not included in Book room.
- R1, R2 and R3 are internal validation rules of Book room, not separate use cases.
- Receive confirmation is modeled as an included use case rather than a separate notification system.
- The cancellation-to-confirmation include is based on US-06, while R4 itself explicitly covers successful bookings.
- Out-of-scope features such as payments, equipment, recurring bookings, waiting lists, registration and other notifications are not modeled.

At least **two** findings. A finding names the element, the problem and the rule or story that
proves it is a problem.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Student → Receive confirmation | The AI connected Student directly to Receive confirmation. Confirmation is produced by the system as an outcome; the Student does not directly trigger this use case. | R4 | Removed the direct Student → Receive confirmation association. |
| 2 | Book room → Receive confirmation and Cancel own booking → Receive confirmation | The AI used two `<<include>>` relationships without the required `' why:` comment directly above them. | R4, US-06, PlantUML convention | Added a `' why:` comment directly above each `<<include>>` relationship explaining its justification from R4 and US-06. |

---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
| Student — Booking | one Student makes 0..* bookings | each Booking belongs to exactly 1 Student | 1 / 0..* |
| Room — Booking | one Room has 0..* bookings over time | each Booking reserves exactly 1 Room | 1 / 0..* |
| Booking — Confirmation | one Booking produces 1..2 confirmations | each Confirmation belongs to exactly 1 Booking | 1 / 1..2 |

### 4.2 Constraints the multiplicities cannot show

- R1: the note on Booking states that the start must be in the future and duration must be greater than 0 and at most 2 hours.
- R2: the note on Booking states that active bookings for the same room must not overlap.
- R3: the note on Room states that a blocked room cannot accept a new booking.
- R4: the note on Confirmation states that a successful booking produces a confirmation.

### 4.3 Assumptions

- A1: Blocking a room prevents new bookings only; existing bookings remain unchanged.
- A2: Each Booking belongs to exactly one Student and reserves exactly one Room.
- A3: A successful booking produces one confirmation, and a successful later cancellation may produce a second confirmation.
- A4: Bookings that only touch at a boundary do not overlap.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Booking — Confirmation `0..*` | The AI allowed zero or any number of confirmations for one Booking. R4 requires a confirmation after a successful booking, while US-06 only justifies another confirmation after cancellation. | R4, US-06 | Changed the Confirmation end from `0..*` to `1..2` and documented the assumption. |
| 2 | Administrator → Room and Administrator → Booking dependencies | The AI added dependency arrows that describe actions rather than stable domain relationships, and they do not have meaningful multiplicities to read in both directions. | US-04, US-05 | Removed the dependency arrows and kept the Administrator operations that represent block, unblock and review usage. |
| 3 | Booking and Room notes | The original diagram did not settle the two scenario ambiguities: touching bookings and the effect of blocking on existing bookings. | Scenario assumptions | Added explicit notes: touching bookings are allowed, and existing bookings remain unchanged when a room is blocked. |

---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3B activity — I chose the activity diagram because it clearly shows the order of validation decisions for the Book room flow and the success and rejection paths.

**Design components added beyond the domain model:** none

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Time range decision | The AI checked the time range but did not identify the decision directly as R1, which made traceability less explicit. | R1 | Added `(R1)` to the time-range decision label. |
| 2 | Blocked-room decision | The AI checked whether the room was blocked but did not identify the decision directly as R3. | R3 | Added `(R3)` to the blocked-room decision label. |
| 3 | Overlap decision | The AI checked for overlapping bookings but did not identify the decision directly as R2 or state the touching-bookings assumption. | R2 | Added `(R2)` to the overlap decision and added the assumption that bookings touching only at a boundary do not overlap. |
| 4 | Send confirmation | The AI showed confirmation after success but did not identify the action directly as R4. | R4 | Renamed the action to `Send confirmation (R4)` to make the rule traceable. |

---

## 6. AI critique

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | The Student cancellation operation does not explicitly show that a Student may cancel only their own booking. | `Student.cancelBooking(booking)` | accept | US-03 says “cancel a booking I made”. I renamed it to `cancelOwnBooking(booking : Booking)`. |
| 2 | The Administrator review operation does not specify the required period. | `Administrator.reviewUsage()` | accept | US-05 says room usage is reviewed over a period. I changed it to `reviewRoomUsage(startTime : DateTime, endTime : DateTime)`. |
| 3 | The overlap decision does not explicitly say that the active booking must be for the same room. | Activity R2 decision | accept | R2 applies to active bookings for the same room. I added “for the selected room” to the decision. |
| 4 | Confirmation terminology should be identical across all diagrams. | `Receive confirmation` / `Send confirmation` / `Confirmation` | reject | The different wording is intentional: the use-case diagram describes the Student goal, while the activity diagram describes the system action. Both refer to the same confirmation required by R4 and US-06. |

---

## 7. Consistency table

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | Book room | Booking (`startTime`, `endTime`, `hasValidTimeRange(now)`) | `Is the time range valid? (R1)` decision |
| R2 | Book room | Booking, Room; R2 note on Booking | `Does the request overlap an active booking for the selected room? (R2)` decision |
| R3 | Book room | Room (`blocked`); R3 note on Room | `Is the room blocked? (R3)` decision |
| R4 | Book room → Receive confirmation | Booking, Confirmation | `Create booking` → `Send confirmation (R4)` |
| US-01 | View room availability | Student, Room | Not shown in the Book room activity diagram |
| US-02 | Book room | Student, Room, Booking, Confirmation | Full Book room activity flow |
| US-03 | Cancel own booking | Student, Booking | Not shown in the Book room activity diagram |
| US-04 | Block or unblock room | Administrator, Room | Not shown in the Book room activity diagram |
| US-05 | Review room usage | Administrator | Not shown in the Book room activity diagram |
| US-06 | Receive confirmation | Booking, Confirmation | `Send confirmation (R4)` after successful booking |

---

## 8. Change log

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | use case | Student was directly associated with `Receive confirmation`, and the `<<include>>` links had no `' why:` comments. | Removed the direct Student → Receive confirmation association and added justification comments above both `<<include>>` links. | R4 makes confirmation a system result, and the PlantUML convention requires a reason above each include relationship. |
| 2 | class | `cancelBooking()`, `reviewUsage()`, and `hasValidDuration()` did not fully express US-03, US-05, and R1. | Changed them to `cancelOwnBooking()`, `reviewRoomUsage(startTime, endTime)`, and `hasValidTimeRange(now)`. | The revised operations now express ownership, the usage period, and the full R1 time requirement. |
| 3 | activity | The overlap decision did not explicitly say that the active booking must be for the same room, and rule IDs were not fully visible. | Added R1/R3/R2 to decision labels, added “for the selected room” to the overlap decision, and marked confirmation as R4. | Improves direct traceability to R1–R4 and makes the R2 condition exact. |
---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
<paste the full output>
```

**FAILs I am keeping, and why:** <one line per check ID, or "none">

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
