# Week 01 — Manual vs AI: Comparison

**Name:** Darkhan Izbassarov  
**Group:** Monday, 16:00-19:00  
**Date:** 14.09.2026

---

## 1. Facts

| | Manual (Part 1) | Rocket (Part 2) |
| --- | --- | --- |
| Language / stack used | Python | Next.js + TypeScript |
| Time to first version that ran | 6 min 24 sec | 7 min |
| Time to all 4 test cases passing | 18 min 1 sec | 12 min |
| Number of attempts / prompts needed | 6 | 2 |
| Lines of code you actually wrote | 42 | 0 generated-code lines written manually |
| Did it handle invalid marks (case B)? | Yes | Yes, after the fix |
| Did it handle an empty list (case D)? | Yes | Yes |
| Did it use the ≥ 50 pass threshold? | Yes | Yes |
| Output format matches the spec? | Yes | Not at all |
| Can you explain every line of it? | Yes |  |

## 2. Test results

| Case | Input | Manual output | Rocket output | Spec says | Match? |
| --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` | avg 67.00 · high 92 · low 23 · pass 60.0% | avg 67.00 · high 92 · low 23 · pass 60.0% | avg 67.00 · high 92 · low 23 · pass 60.0% | Yes |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | avg 71.60 · high 100 · low 47 · pass 80.0% | initially accepted `101`; after fix: avg 71.60 · high 100 · low 47 · pass 80.0% | avg 71.60 · high 100 · low 47 · pass 80.0% | Yes, after fix |
| C | `10, 20, 30` | avg 20.00 · high 30 · low 10 · pass 0.0% | avg 20.00 · high 30 · low 10 · pass 0.0% | avg 20.00 · high 30 · low 10 · pass 0.0% | Yes |
| D | `abc, , xyz` | clear message, no crash | clear message, no crash | clear message, no crash | Yes |

## 3. What the AI added that I never asked for

- A full web interface
- Next.js and TypeScript
- Styling and layout for the application
- Extra visual elements that were not part of my original prompt

## 4. What the AI got wrong or silently skipped

- Rocket initially accepted `101` as a valid mark.
- According to the specification, valid marks must only be from 0 to 100 inclusive.
- Because of this, the result for test case B was incorrect before the fix.

## 5. The defect I asked Rocket to fix

**Prompt I used:**

`Fix the program so that marks below 0 or above 100 are ignored and are not included in the statistics.`

**Result:** Fixed.

**What this tells me:**

AI can generate a working application very quickly, but a working application is not always a correct application. I still need to compare the result with the specification and test it carefully.

---

## 6. Reflection (200–300 words)

In this task I created the same program in two different ways. First, I wrote the program manually in Python. My first working version took about 6 minutes, but it took around 18 minutes to make all four test cases work correctly. The manual version required more thinking because I had to create the logic myself, handle invalid values, calculate the statistics, and test the program.

The Rocket version was easier to create. I gave Rocket a short prompt and it generated a complete web application using Next.js and TypeScript. The first version took about 7 minutes, and after testing and fixing the problem, the whole process took around 12 minutes. Rocket also added a web interface and other features that I did not ask for.

However, the AI version was not completely correct. During testing I found that Rocket accepted `101` as a valid mark, even though the specification says that only marks from 0 to 100 are valid. I had to use another prompt to fix this problem.

I would be more confident putting my name on the manual version because I understand every part of its logic. The AI version is faster and more advanced, but it still needs human checking. This experiment showed me that a software engineer is still responsible for understanding the requirements, testing the program, finding defects, and checking that the final result actually matches the specification.