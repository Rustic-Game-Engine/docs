# Understand action cleanup

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Owner destruction/disable/failure, scene disposal, and successful reload remove
owned operations, voices, callback references and subscriptions. Removed targets cancel referring actions and
queued completion callbacks. Failed reload retains the previous owner's actions.
Callbacks can enqueue new actions without blocking the action scheduler.
