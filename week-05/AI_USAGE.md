# AI Usage Disclosure — Week 05

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| ChatGPT | GPT-5.6 Sol | the plan (Task 1) | `lab-report.md` §2 |
| ChatGPT | GPT-5.6 Sol | the first version, v1 (Task 2) | `code/original/booking_v1.py`, `code/booking.py` |
| ChatGPT | GPT-5.6 Sol | assistance with test design and boundary cases | `code/test_booking.py`, `lab-report.md` §4 |
| ChatGPT | GPT-5.6 Sol | focused critique of the final implementation | `lab-report.md` §6 |

**The assistant wrote, or helped write, my tests in `code/`:** yes  
ChatGPT helped propose the six required table-case tests, additional boundary and overlap tests, and the final edge-case test. I checked each expected result against AC1–AC5 before relying on it. The final suite passed all 18 tests, and the mutation checker passed M1–M10.

**`code/original/` holds the assistant's first answer exactly as returned:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition:** yes

**Anything I accepted from the AI without fully understanding it:**  
None.

Signed: Darkhan Izbassarov  
Date: 2026-10-06