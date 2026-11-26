# AI Usage Disclosure — Week 11

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.


| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| GitHub Copilot Chat | Copilot Fusion (gpt-6-luna) | Built the feature: mock adapter, explain.ts, Explain availability button and tests (Task 3) | app/AGENTS.md, app/src/App.tsx, app/src/availability.ts, app/src/booking.ts, app/src/explain.ts, app/src/explain.test.ts |
| ChatGPT | GPT-6 High | Compared three system instructions A, B and C in fresh chats (Task 4) | None directly; results recorded in lab-report.md |
| ChatGPT | GPT-6 High | Independent read-only agentic code review (Task 6) | None; reviewer did not edit files |
| ChatGPT | GPT-6 | Helped verify and fix V1 and V2 using regression tests (Task 7) | app/src/explain.ts and app/src/explain.test.ts, manually edited by me |
| ChatGPT | GPT-6 | Helped with report formatting, explanations, troubleshooting and reflection | lab-report.md and AI_USAGE.md, manually edited by me |


**Every file the assistant changed in Task 3 was reviewed by me before I accepted it (§4.2):** yes
<!-- Name anything you accepted without reading. -->

**No API key, token or provider call is anywhere in `app/src/`:** yes

**The review in Task 6 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes
<!-- If it edited anything, say what and how you undid it. -->

**I labelled every finding in §7.3 after verifying it myself:** yes

**I used another assistant as well (to explain an error, to draft text in lab-report.md, …):** yes
<!-- If "yes": which one, the exact model, and for which section. -->
ChatGPT GPT-6 helped with implementation guidance, troubleshooting

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain how explainAvailability handles a timeout and a contradicting answer, without the
assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
None to the best of my knowledge. I reviewed the changed code, reproduced V1 and V2 through failing tests, and verified that all 37 tests passed after the fixes.

Signed: Izbassarov Darkhan
Date: 27-11-2026
