# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:** Darkhan Izbassarov 
**Student ID:** 24B031815
**GitHub:** Darics3

---

## 1. Setup

| | |
| --- | --- |
| Assistant (frozen for the whole lab) | ChatGPT |
| Exact model (or "not displayed") | GPT-5.6 Sol |
| Three fresh chats for R1, R2, R3? (yes / no) | no |
| Python version (`python --version`) | Python 3.13.1 |

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Checks whether a room is available for a requested time period using whole minutes since midnight in the range 0–1440. It considers the current time, blocked status, and existing bookings. This tool only checks availability and does not save or create a booking.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested start time in whole minutes since midnight."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested end time in whole minutes since midnight."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Current time in whole minutes since midnight."
      },
      "blocked": {
        "type": "boolean",
        "description": "Whether the room is currently blocked."
      },
      "bookings": {
        "type": "array",
        "description": "Existing bookings for the room.",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            }
          },
          "required": [
            "start",
            "end"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "start",
      "end",
      "now",
      "blocked",
      "bookings"
    ],
    "additionalProperties": false
  }
}
```

| Field | Constraint | What goes wrong without it |
| --- | --- | --- |
| inputSchema | `"type": "object"` | The tool arguments would not be required to have an object structure. |
| inputSchema | `"required": ["start", "end", "now", "blocked", "bookings"]` | The model could omit a required argument such as `now`. |
| inputSchema | `"additionalProperties": false` | The model could invent unsupported fields such as `"room": "204"`. |
| start | `"type": "integer"` | Strings such as `"10:00"` or fractional values such as `600.5` could be accepted. |
| start | `"minimum": 0` | A time before the beginning of the day, such as `-30`, could be accepted. |
| start | `"maximum": 1440` | A time beyond the end of the day could be accepted. |
| end | `"type": "integer"` | A value such as `"11:00"` could be accepted instead of whole minutes. |
| end | `"minimum": 0` | A negative end time could be accepted. |
| end | `"maximum": 1440` | A time beyond 24:00, such as `1500`, could be accepted. |
| now | `"type": "integer"` | The current time could be supplied as text or a fractional number instead of whole minutes. |
| now | `"minimum": 0` | A current time before the beginning of the day could be accepted. |
| now | `"maximum": 1440` | A current time outside the allowed day range could be accepted. |
| blocked | `"type": "boolean"` | A string such as `"false"` could be accepted instead of the boolean value `false`. |
| bookings | `"type": "array"` | Existing bookings could be supplied in the wrong container type. |
| bookings items | `"type": "object"` | A booking such as `[660, 720]` could be accepted instead of an object. |
| booking start | `"type": "integer"` | A booking start could use text or a fractional value instead of whole minutes. |
| booking start | `"minimum": 0` | A booking could begin before the valid day range. |
| booking start | `"maximum": 1440` | A booking start beyond the end of the day could be accepted. |
| booking end | `"type": "integer"` | A booking end could use text or a fractional value instead of whole minutes. |
| booking end | `"minimum": 0` | A booking could end before the valid day range. |
| booking end | `"maximum": 1440` | A booking end beyond the end of the day could be accepted. |
| bookings items | `"required": ["start", "end"]` | An incomplete booking such as `{ "start": 660 }` could be accepted. |
| bookings items | `"additionalProperties": false` | An individual booking could contain unsupported extra fields. |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | No change needed |
| S02 | PASS | PASS | No change needed |
| S03 | FAIL | PASS | Added integer type for end |
| S04 | FAIL | PASS | Made now a required field |
| S05 | FAIL | PASS | Added additionalProperties: false |
| S06 | FAIL | PASS | Added minimum 0 for start |
| S07 | FAIL | PASS | Added maximum 1440 for end |
| S08 | FAIL | PASS | Required start and end inside each booking |
| S09 | FAIL | PASS | Added boolean type for blocked |
| S10 | FAIL | PASS | Used integer type for start |
| S11 | PASS | PASS | No change needed |
| S12 | FAIL | PASS | Defined each booking item as an object |

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text

```

<!-- Match? If F3 failed, which argument differs, and who was wrong: the model or the request? -->

### R2

```text

```

<!-- Same. R2 is a call that SHOULD be made, although canBook will say Unavailable. Did the model refuse to call? -->

### R3

```text

```

<!-- What information was missing? Did the model ask, or call? If it called, which values did it invent, and from where? -->

## 5. What the schema cannot check

<!-- Name the acceptance criteria (AC1-AC6, README section 3) that a JSON Schema with the allowed keywords cannot
     enforce, and say why for each. At least two, by their AC number. Which part of AC1 CAN the schema enforce? -->

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | | |
| A2 | read `week-08/app/src/booking.ts` | | |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | | |
| A4 | run `npm test` in `week-08/app` | | |
| A5 | run `git reset --hard` to undo its own last three edits | | |
| A6 | `git commit` its change on the `week-09` branch | | |
| A7 | `git push` to `main` | | |
| A8 | send the contents of `.env` to an MCP server it found online | | |

## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text

```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. -->

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->
