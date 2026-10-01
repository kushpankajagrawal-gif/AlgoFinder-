# AlgoFinder Phase 10: AI DSA Interview Preparation

Phase 10 adds an interview simulator that preserves the interviewer role. The backend selects the problem and owns the session state; the AI asks questions, evaluates recorded responses, and provides controlled hints. It must not immediately reveal a solution or replace the user's reasoning.

## Session State Machine

```text
CREATED -> STARTED -> PROBLEM_PRESENTED -> UNDERSTANDING
-> APPROACH_DISCUSSION -> ALGORITHM_DISCUSSION -> CODING
-> TESTING -> COMPLEXITY_DISCUSSION -> FOLLOW_UP
-> FINAL_REVIEW -> COMPLETED
```

Terminal states are `ABANDONED` and `TIMEOUT`. The server validates every transition; the browser never decides that a session is complete.

## API Contract

- `POST /interview/start`: create a session from mode, difficulty, topic, language, duration, hints, and follow-up settings.
- `GET /interview/{session_id}`: return authorized session state and public problem data.
- `POST /interview/respond`: save an approach/communication response and return the next interviewer message/state.
- `POST /interview/approach`: persist the structured approach response.
- `POST /interview/complexity`: persist the user's time/space answers for later comparison with Phase 7 analysis.
- `POST /interview/run-code`: delegate code execution to the existing Phase 8 sandbox. Do not create a second executor.
- `POST /interview/hint`: return a controlled hint level; do not send hidden solutions or expected outputs.
- `POST /interview/follow-up`: generate a contextual question from problem, code, static analysis, complexity, and tests.
- `POST /interview/complete`: finalize the server-owned session and create a report.
- `GET /interview/report/{session_id}`, `/interview/history`, `/interview/analytics`, `/interview/recommendation`.

The frontend calls `/interview/start`, `/interview/respond`, `/interview/hint`, `/interview/run-code`, and `/interview/complexity` from the session UI. An unavailable service is shown honestly; no timer, problem, score, test result, or feedback is fabricated.

## Models

`InterviewSession` stores authenticated `user_id`, mode, difficulty, topic, language, problem, state, server timestamps, duration, hints used, and follow-up settings. `InterviewResponse` stores stage, question, user response, and interviewer response. `InterviewEvaluation` stores rubric categories and evidence. Hidden tests, expected outputs, and reference solutions remain server-side.

## Practice Rubric

Use a transparent 0-3 scale, configured centrally:

- 0: not demonstrated
- 1: partially demonstrated
- 2: demonstrated
- 3: strongly demonstrated

Evaluate problem understanding, approach, algorithm selection, complexity, coding, testing, edge cases, communication, and follow-up handling. Label the result `Practice evaluation`; it is not a hiring prediction.

## Security

Require authentication and authorization for every session route. Derive the user from the auth context, not a client user ID. Keep LLM keys and hidden problem data on the backend. Treat user responses as untrusted content and keep system/developer instructions separate to resist prompt injection. Use the existing Phase 8 sandbox for code; never execute code on the API host.

## Phase 9 Integration

When enough private learning data exists, use skills, weak topics, interview history, and preferences to recommend an interview. Explain the recommendation from stored features. A single session is not enough to infer a trend.
