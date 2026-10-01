# AlgoFinder Phase 9: Personalized Learning

Phase 9 turns real activity from Phases 4-8 into private, explainable learning guidance. The current frontend is backend-ready and intentionally displays an empty state until authenticated API data exists.

## Data Boundary

Personalized values must come from authenticated FastAPI endpoints backed by PostgreSQL (SQLite is acceptable for local development):

- `GET /dashboard`
- `GET /user/progress`
- `GET /user/skills`
- `GET /user/history`
- `GET /user/mistakes`
- `GET /recommendations`
- `GET /recommendations/next`
- `GET /learning-path`
- `GET /daily-plan`
- `GET /revision`
- `GET /analytics`
- `POST /activity`

The server derives user identity from authentication. Do not trust a client-supplied `user_id` for authorization.

## Suggested Models

`User`, `Problem`, `Algorithm`, `Topic`, `ProblemAttempt`, `Execution`, `TestResult`, `LearningActivity`, `UserSkill`, `LearningSession`, `Recommendation`, `LearningPath`, `UserPreference`, `Note`, and `Bookmark` should have foreign keys, valid status values, UTC timestamps, and user-scoped access controls.

A `LearningActivity` records `activity_id`, authenticated `user_id`, `activity_type`, optional problem/algorithm/topic references, JSON metadata, and `timestamp`. Useful activity types include `PROBLEM_STARTED`, `PROBLEM_SOLVED`, `PROBLEM_FAILED`, `CODE_EXECUTED`, `TEST_PASSED`, `TEST_FAILED`, `HINT_USED`, `EXPLANATION_VIEWED`, and `PROBLEM_COMPLETED`.

## Explainable Calculations

Centralize these services:

- `calculate_success_rate()`
- `calculate_mastery()`
- `calculate_streak()`
- `calculate_topic_progress()`
- `calculate_revision_due()`
- `generate_recommendations()`
- `generate_learning_path()`
- `generate_daily_plan()`

Mastery is an estimated signal, not a scientific measurement. Keep thresholds in configuration and explain recommendation reasons using actual features such as weak topic, recent failure, prerequisite readiness, revision due, goal, and difficulty fit.

## Dashboard Response

```json
{
  "stats": {
    "problems_solved": 12,
    "attempts": 18,
    "topics_practiced": 5,
    "current_streak": 4
  },
  "progress": [],
  "practice_topics": [],
  "recommendations": [],
  "recent_activity": []
}
```

If no activity exists, return empty arrays and zero values. The frontend must show the new learner state instead of inventing progress history.

## Privacy and Time

Store timestamps in UTC and convert to the user's timezone for streaks, activity calendars, revision dates, and daily plans. Every personalized endpoint must enforce authentication and user ownership.

## Phase Integration

Record recommendation, explanation, generation, static-analysis, execution, and test-result events from Phases 4-8. Phase 9 answers which problem the learner should practice next; it does not replace Phase 4's algorithm-fit recommender.
