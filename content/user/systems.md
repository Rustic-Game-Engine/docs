# Engine systems

Use the [status and compatibility reference](/docs/reference/compatibility) to distinguish implemented systems from planned workflows. Each system guide retains its detailed API and limitations.

| System | Start here | API reference |
| --- | --- | --- |
| Rendering / scene lighting | [Sky and atmosphere](/docs/guides/scene-environment), [Rendering System](/docs/open-source/engine/rendering-system) | [Environment](/docs/api/environment) |
| Primitive physics | [Basic physics](/docs/guides/physics) | [Queries and forces](/docs/api/physics-actions) |
| Animation | [Imported clips](/docs/guides/gameplay-actions/imported-animation), [Layering](/docs/guides/gameplay-actions/animation-layers) | [Animation](/docs/api/animation) |
| Tweening / easing | [Animate properties](/docs/guides/gameplay-actions/properties) | [Tween](/docs/api/tween), [Ease](/docs/api/ease) |
| Paths / movement | [Follow a path](/docs/guides/gameplay-actions/paths) | [Path](/docs/api/path), [Movement](/docs/api/movement) |
| Audio | [Play, fade and record](/docs/guides/gameplay-actions/audio) | [Audio](/docs/api/audio) |
| Input | [Held keys in Play](/docs/scripting/lua/input) | [Input](/docs/api/input) |
| Cameras | [Cameras and lights](/docs/guides/cameras-and-lights) | [Current camera](/docs/api/camera), [Camera actions](/docs/api/camera-actions) |
| Events / timers / clock | [Gameplay actions](/docs/guides/gameplay-actions) | [Events](/docs/api/events), [Timer](/docs/api/timer), [Clock](/docs/api/clock) |
| UI script assets | [HTML/CSS](/docs/scripting/web) | [JavaScript behavior API](/docs/scripting/javascript/api-reference) |

HTML support does not implement browser layout, DOM or network access. The public [hosting-sdk](/docs/open-source/hosting-sdk) is **Not Yet Implemented**; there is no documented multiplayer or managed-hosting SDK workflow to follow. [Standalone](/docs/building/publishing) is a local Play mode, not a completed export target.
