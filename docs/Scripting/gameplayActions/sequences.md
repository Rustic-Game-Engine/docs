# Compose sequences

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

`Sequence.new().call(fn)` queues a callback between steps; `.parallel({builder1,
builder2})` starts their sequences together and waits for the longest. `Timeline`
provides the same builder in every language. Do not replay a builder containing callbacks;
construct a new builder so it has new callback tokens. `.animation(object, clipName,
options?)` inserts clip playback as a sequence step.
