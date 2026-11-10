# AI Usage Disclosure — SIS #04

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| ChatGPT | GPT-5.6 Sol / Plus | 2026-11-10 | codebase analysis (Task 1) | `report.md` sections 2–3; analysis of `App.tsx`, `booking.ts`, `bookingLogic.ts`, `sampleData.ts`, `types.ts` |
| ChatGPT | GPT-5.6 Sol / Plus | 2026-11-10 | improvement plan | `report.md` section 3 |
| ChatGPT | GPT-5.6 Sol / Plus | 2026-11-10 | feature extension (Task 2) | `app/src/rooms.ts`, `app/src/filter.ts`, `app/src/booking.ts`, `app/src/App.tsx` |
| ChatGPT | GPT-5.6 Sol / Plus | 2026-11-10 | refactoring (Task 3) | `app/src/App.tsx`, `app/src/bookingLogic.ts`, `app/src/types.ts`, `app/src/sampleData.ts`, `diagrams/before.puml`, `diagrams/after.puml` |
| ChatGPT | GPT-5.6 Sol / Plus | 2026-11-10 | tests (Task 4) | `app/src/filter.test.ts`, `app/src/roomBooking.test.ts`, `app/src/booking.test.ts` |
<!-- Delete rows you did not use the assistant for; add rows for anything else. The optional
     extension (an existing skill or a read-only MCP server) goes here too, with its permissions. -->

**The assistant wrote, or helped write, tests in `app/`:** yes
<!-- Either answer is allowed. If "yes": which tests, and how you checked that their EXPECTED values
     come from AC1–AC5 and F1–F5, not from what the code happens to return. -->
     ChatGPT helped with filter.test.ts, roomBooking.test.ts, and the required B1–B4 identifiers added to existing booking.test.ts titles. I checked the expected values against AC1–AC5, F1–F5 and the explicit B1–B6 requirements instead of deriving expected values from the implementation. I then ran the real Vitest suite and confirmed 27/27 tests passed.

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes

**Every number in report.md section 7 was measured the way its row says:** yes

**I shared no credentials, keys or private data with any tool:** yes

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and
why each module exists:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the line. An honest entry here costs far less than a blank one that turns out to be untrue. -->
none
Signed: Darkhan Izbassarov
Date: 2026-11-10
