# Lab report — Practice #03, Requirements Engineering with AI

Fill in every section. **Do not delete or renumber the headings** — the README points at them and a
missing heading reads as a missing section.

Name: Darkhan Izbassarov
Student ID: 24B031815
GitHub username: Darics3

---

## 1. Setup

| | |
| --- | --- |
| AI assistant (tool) | ChatGPT |
| Exact model name and version | GPT-5.6 Sol |
| Date of the session | 22.09.2026 |
| Diagram renderer used | PlantUML |

One tool and one model for all three prompts. If you switched, say why here — it changes what your
findings mean.

---

## 2. Original AI output — user stories (Part 1)

Paste the **unedited** response to Prompt 1. Do not tidy it. If it is long, paste all of it anyway;
this is the baseline everything else is measured against.

```
## Student and Administrator Goals

**Student goals:**
The Student wants to see when study rooms are available, reserve an available room, cancel a reservation they previously made, and receive confirmation when a booking or cancellation succeeds.

**Administrator goals:**
The Administrator wants to control whether rooms are available for booking by blocking or unblocking them and review room usage over a selected period.

## User Stories

| ID        | User Story                                                                                                                                                         | Priority | Assumption                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US-01** | As a **Student**, I want to **view room availability**, so that I can see which rooms are free and when.                                                           | Must     | Availability reflects existing bookings and whether a room is blocked.                                                                                                 |
| **US-02** | As a **Student**, I want to **book a free room for a time slot**, so that I can reserve it for individual or group study.                                          | Must     | The booking must follow R1–R4: it starts in the future, lasts no more than two hours, does not overlap another booking for the same room, and the room is not blocked. |
| **US-03** | As a **Student**, I want to **cancel a booking I made**, so that the reserved room and time slot become available again.                                           | Must     | A Student can cancel only a reservation that they made.                                                                                                                |
| **US-04** | As an **Administrator**, I want to **block or unblock a room**, so that rooms that should not be booked can be taken out of service and later returned to service. | Must     | A blocked room cannot be booked, according to R4.                                                                                                                      |
| **US-05** | As an **Administrator**, I want to **review room usage over a period**, so that I can see how study rooms are being used.                                          | Must     | Usage information is based only on room booking information available within this system.                                                                              |
| **US-06** | As a **Student**, I want to **receive confirmation after a booking or cancellation**, so that I know the requested action was completed.                           | Must     | Confirmation is limited to booking and cancellation confirmation and does not include SMS, push notifications, or reminders.                                           |

## Scope Check

These six stories correspond directly to the six supplied use cases:

**US-01 → UC-01 View availability**
**US-02 → UC-02 Book room**
**US-03 → UC-03 Cancel booking**
**US-04 → UC-04 Block or unblock room**
**US-05 → UC-05 Review usage**
**US-06 → UC-06 Send confirmation**

No stories introduce payments, fines, check-in, QR codes, maintenance requests, authentication, waiting lists, reminder notifications, or implementation details such as screens, databases, or servers.

```

---

## 3. Story review (Part 2)

| Story (as generated) | What I did | Why | Final ID |
| --- | --- | --- | --- |
| US-01 | Kept the story and assumption, changed priority from `Must` to `High`. | The story uses the correct Student actor, maps directly to UC-01, is testable and stays in scope. The final template requires High/Medium/Low priorities. | US-01 |
| US-02 | Kept the story and assumption, changed priority from `Must` to `High`. | It maps directly to UC-02 and correctly references R1–R4. It describes one testable booking outcome. | US-02 |
| US-03 | Kept the story and assumption, changed priority from `Must` to `High`. | It correctly limits cancellation to a booking made by the Student and maps directly to UC-03. | US-03 |
| US-04 | Kept the story and assumption, changed priority from `Must` to `High`. | Administrator is the correct actor for blocking or unblocking rooms, and the story stays within UC-04 and R4. | US-04 |
| US-05 | Kept the story and assumption, changed priority from `Must` to `Medium`. | It correctly gives Review usage to the Administrator and maps to UC-05. It is useful but less central to the booking flow than booking and availability. | US-05 |
| US-06 | Kept the story, changed priority from `Must` to `High`, and rewrote the assumption. | The generated assumption explicitly mentioned SMS, push notifications and reminders, which are on the out-of-scope list. I removed that vocabulary while preserving UC-06. | US-06 |



**Did the assistant invent anything outside the scenario?**

US-06 mentioned SMS, push notifications and reminders in its assumption. These terms are explicitly out of scope, even though the generated story mentioned them only to exclude them. I removed this vocabulary from the final US-06 assumption. I also checked all stories for payments, fines, check-in or QR codes, maintenance requests, authentication, waiting lists, screens, databases and servers.

**How many stories did you end with, and why that number?**

I ended with 6 stories because each story maps directly to one of the six fixed use cases, UC-01 through UC-06. Adding more stories was unnecessary and could widen the fixed scenario.

---

## 4. Original AI output — acceptance criteria (Part 3)

```
(paste here)
```

---

## 5. Criteria review (Part 3)

| Criterion (as generated) | Problem | What I changed it to | Final ID |
| --- | --- | --- | --- |
| | | | |

**The two open questions.** Write your decision and the reason. Either answer is accepted.

| Question | My decision | Why |
| --- | --- | --- |
| A booking ending exactly when another begins — overlap under R3? | allowed / not-allowed | |
| Is exactly two hours allowed under R2? | allowed / not-allowed | |

**Which invalid or boundary case did the assistant leave out?**

---

## 6. Original AI output — use-case diagram (Part 4)

```
(paste the PlantUML source exactly as generated)
```

Rendered diagram (image, or a link):

---

## 7. Diagram review (Part 4)

| Element | Problem | What I changed |
| --- | --- | --- |
| | | |

**Associations.** Which actor–use-case links did the assistant draw that a person does not actually
trigger? Name them.

**Did any screen, database or internal component appear as a use case or an actor?**

---

## 8. Traceability (Part 5)

Summarise what the table in `requirements/traceability.md` shows:

- Use cases with **no story** behind them:
- Stories with **no use case** they belong to:
- Criteria that test **no rule** from section 1:

**What does the largest gap tell you about the generated requirements?**

---

## 9. Checker runs

Paste the **real terminal output** of both runs. A table with nothing behind it does not count.

```
$ python tests/check_requirements.py
(paste)
```

```
$ python tests/validate_submission.py
(paste)
```

| | PASS | FAIL | ERROR |
| --- | --- | --- | --- |
| `check_requirements.py` | | | |

Commit these numbers were produced at (`git rev-parse --short HEAD`):

**Every FAIL, one line each: what it is and what you decided to do about it.** A FAIL you report and
explain costs you nothing.

**Did you run the checks by hand instead of with Python?** Say so here — it costs nothing, but it
has to be said.

---

## 10. Conclusion (150–200 words)

Answer all three:

1. Which part of the generated requirements was most wrong, and how would you have caught it without
   a checker?
2. What did the assistant get right that would have taken you noticeably longer by hand?
3. You are handing these requirements to someone who will implement them, and you will not be in the
   room. Which single one would you rewrite first, and why?

Be specific. "The AI was useful" is worth nothing; "UC-06 had no story behind it until I wrote
US-07, and the checker is what told me" is worth everything.
