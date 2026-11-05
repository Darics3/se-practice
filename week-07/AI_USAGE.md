# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| ChatGPT | GPT-5.6 Sol / ChatGPT Plus | the first test suite (Task 3) | `suites/first/booking.test.ts`, `app/src/booking.test.ts` |
| ChatGPT | GPT-5.6 Sol / ChatGPT Plus | the improvement prompt, test review and failure diagnosis (Task 5) | `app/src/booking.test.ts`|
| ChatGPT | GPT-5.6 Sol / ChatGPT Plus | extracting `canBook`, explaining checker failures, and helping with report wording | `app/src/booking.ts`, `app/src/App.tsx` |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes

ChatGPT helped extract the booking decision into `app/src/booking.ts` and update `app/src/App.tsx` to call `canBook`. I checked that the behaviour did not intentionally change by running the application, checking the booking result in the UI, and later running the final 17-test suite.

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** no

I used ChatGPT throughout the work rather than a second assistant.

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every test in my final suite — its input, its expected result and the AC behind it — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**

None. I reviewed the final tests against AC1–AC6 and the test plan, ran the suite myself, and checked the deliberate mutants and UI cases.

Signed: Darkhan Izbasarov  
Date: 2026-11-06