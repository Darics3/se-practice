# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| ChatGPT | GPT-5.6 Sol | the plan (stage A) | `report.md` (exchange recorded in section 11) | week-05 |
| ChatGPT | GPT-5.6 Sol | Python v1 (stage B) | `code/original/booking_v1.py` | week-05 |
| Bolt.new | not displayed | web prototype v1 (stage B) | `web/original/` | week-06 |
| ChatGPT | GPT-5.6 Sol | repair (stage D) | `web/final/src/sampleData.ts`, `web/final/src/App.tsx`, `report.md` sections 7 and 11 | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes

The tests in `code/test_booking.py` were reused from Week 05, where ChatGPT helped with the test design. I checked the expected values against AC1–AC5, including the boundary cases for `start == now`, exactly 120 minutes, endpoint touching, overlap, blocked rooms, and unchanged existing bookings. I also ran the complete test suite and the SIS checker to confirm the expected results were based on the acceptance criteria rather than on whatever the generated function returned.

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes

**Every result in report.md section 5 was actually run or seen, not assumed:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition and what the agent did in section 9:** yes

**Anything I accepted from the AI without fully understanding it:**

None. I reviewed the suggested changes before applying them and verified the final behaviour with the required tests and checker.

Signed: Darkhan Izbasarov
Date: 2026-11-01