# AI Usage Disclosure — Week 09

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| ChatGPT | GPT-5.6 Sol | Part 2 — writing the calls for R1, R2, R3 | `calls/` (saved by me, unedited) |
| ChatGPT | GPT-5.6 Sol | Helped draft and revise the tool schema, explain schema constraints and checker results, and draft report explanations | `tool/check_room.json` |

**I wrote `tool/check_room.json` myself:** no
<!-- If an AI wrote or revised any of it, say which part, and how you checked it. -->
ChatGPT helped draft and revise the field types, ranges, required fields, booking item structure, and additionalProperties constraints. I checked the result by running python tests/check_tool.py; D1–D6 and S01–S12 all passed.
**I used an AI to explain a JSON Schema keyword or a check:** yes
<!-- If "yes": which one, and for what. -->
ChatGPT explained type, integer, minimum, maximum, required, items, and additionalProperties, and helped explain why the S and L checker cases passed or failed.
**Every reply in `calls/` and in lab-report.md section 4 is exactly what the model returned:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
None. I reviewed the suggested schema and report explanations and verified the technical parts using the provided checker.
Signed: Darkhan Izbassarov
Date: 2026-11-09
