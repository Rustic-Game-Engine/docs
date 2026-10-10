# Shared gameplay actions (API 1.1)

The engine now owns an action scheduler shared by scripting languages. Easing,
interpolation, path traversal, composition, and lifetime cleanup run in Rust. The
script only starts an action and handles its callbacks. You do not edit JSON or
advance an action manually from `Update`.

The same modules are available in Lua 5.4, Luau, JavaScript, Python, C, C++, C#,
Java, PHP, and HTML inline JavaScript. Named skeletal clips, procedural actions,
physics queries, audio voices, and synchronous interpolation use engine services.

## API reference pages

- [Tween](/docs/api/tween) — Animate an entity property or script value without writing an Update loop.
- [Ease](/docs/api/ease) — Choose one of 31 shared easing curves for actions and synchronous interpolation.
- [Movement](/docs/api/movement) — Move, turn, follow and orbit objects with finite engine-scheduled actions.
- [Animation](/docs/api/animation) — Play imported skeletal clips, register property tracks, animate script values and run procedural poses.
- [Sequence and Timeline](/docs/api/sequence) — Compose sequential and parallel actions without nesting timer callbacks.
- [Timer](/docs/api/timer) — Schedule one-shot or repeating scene-clock callbacks.
- [Smooth and Interpolation](/docs/api/smooth) — Evaluate interpolation and damping immediately without scheduling an action.
- [Path](/docs/api/path) — Traverse linear, Bezier and spline paths with global and per-segment easing.
- [Camera actions](/docs/api/camera-actions) — Move, aim, zoom, follow and shake a game camera using shared actions.
- [Physics queries and forces](/docs/api/physics-actions) — Query live primitive colliders and change simulated body velocity.
- [Effects](/docs/api/effects) — Fade, flash, shake and pulse entity properties with shared easing.
- [Audio](/docs/api/audio) — Play engine-decoded WAV/OGG voices, adjust parameters and schedule fades.
- [Events and signals](/docs/api/events) — Communicate through queued global events and object-scoped signals across scripting languages.
- [Clock](/docs/api/clock) — Scale or pause the shared scene clock for actions, animation, physics and audio.
- [Operation handles](/docs/api/operation-handles) — Inspect, pause, resume, cancel and observe engine-scheduled actions.

## Topics

- [Set up gameplay actions](/docs/guides/gameplay-actions/setup)
- [Gameplay language bindings](/docs/guides/gameplay-actions/language-bindings)
- [Choose easing curves](/docs/guides/gameplay-actions/easing)
- [Set action duration or speed](/docs/guides/gameplay-actions/timing)
- [Animate entity properties](/docs/guides/gameplay-actions/properties)
- [Tween script values](/docs/guides/gameplay-actions/value-tweens)
- [Follow a path](/docs/guides/gameplay-actions/paths)
- [Schedule timers](/docs/guides/gameplay-actions/timers)
- [Control operation handles](/docs/guides/gameplay-actions/operation-handles)
- [Compose sequences](/docs/guides/gameplay-actions/sequences)
- [Animate a camera](/docs/guides/gameplay-actions/camera)
- [Follow and orbit objects](/docs/guides/gameplay-actions/movement)
- [Apply visual effects](/docs/guides/gameplay-actions/effects)
- [Send events and object signals](/docs/guides/gameplay-actions/events)
- [Control the scene clock](/docs/guides/gameplay-actions/clock)
- [Understand action cleanup](/docs/guides/gameplay-actions/lifetime)
- [Diagnose gameplay actions](/docs/guides/gameplay-actions/diagnosis)
- [Play imported animation clips](/docs/guides/gameplay-actions/imported-animation)
- [Layer animation clips](/docs/guides/gameplay-actions/animation-layers)
- [Register animation tracks](/docs/guides/gameplay-actions/animation-tracks)
- [Animate script value keyframes](/docs/guides/gameplay-actions/value-keyframes)
- [Use procedural animation](/docs/guides/gameplay-actions/procedural-animation)
- [Evaluate interpolation](/docs/guides/gameplay-actions/interpolation)
- [Query physics colliders](/docs/guides/gameplay-actions/physics-queries)
- [Apply physics forces](/docs/guides/gameplay-actions/physics-forces)
- [Play and fade audio](/docs/guides/gameplay-actions/audio)
- [Validate gameplay services](/docs/guides/gameplay-actions/validation)
- [Extend gameplay services](/docs/guides/gameplay-actions/extension)
