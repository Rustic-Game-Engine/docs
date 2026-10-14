# Gameplay and scripting

Rustic supports C, C++, C#, Python, JavaScript, Lua 5.4, Luau, Java, PHP and HTML/inline JavaScript behaviors. CSS-only assets are valid no-op behaviors, not a browser rendering system. Start with [the Lua tutorial](/docs/tutorials/first-game), then consult [compatibility](/docs/reference/compatibility) and your language guide.

## Create, discover and attach scripts

**Programming** creates **Global Startup Script**, **Scene Startup Script**, or **Object Component Script** assets. The menu directly contains scope submenus; there is no intervening **New Script** submenu in the inspected source. Components attach through Inspector **+ Add Component**, **Programming > Attach Existing Script**, or the supported Explorer drag workflow.

The editor scans recognized project source extensions and registers stable asset identities. Registered moves/renames preserve attachments. It maintains `config/scripts.ron`; users should not edit that registry or hand-write component JSON. Scripts under `scripts/` include `.lua`, `.luau`, `.js`, `.py`, `.c`, `.cpp`, `.cs`, `.java`; PHP/Web assets belong under `ui/`. Discovery does not guarantee an external compiler/interpreter is installed.

**Luau caveat:** `.luau` discovery, SDK and host are implemented, but the inspected script-creation menu omits Luau. Create a `.luau` file under `scripts/` in an external editor and select a target object, then right-click the file in Explorer and choose **Set As > Object Component Script** to register and attach it. Check Console discovery errors. The menu limitation does not make Luau interchangeable with Lua 5.4.

## Scope and execution order

Global startup scripts run first, then scene startup scripts, then object components. Ordering uses scope, explicit execution order, entity Asset ID, script Asset ID and attachment order. Global/scene scripts are suitable for orchestration; an object component targets its owning entity. Use the editor’s scope workflow to avoid accidentally running one controller as both a startup script and a component.

## Lifecycle

| Purpose | Lua / JavaScript / Web canonical name | External SDK callback key |
| --- | --- | --- |
| Create | OnCreate | on_create |
| Start once | Start | on_start |
| Enabled / disabled transition | OnEnable / OnDisable | on_enable / on_disable |
| Fixed simulation step | FixedUpdate(dt) | fixed_update(dt) |
| Frame update | Update(dt) | update(dt) |
| Owner destruction | OnDestroy | on_destroy |
| Stop before cleanup | OnStop | on_stop |

Lua and JavaScript also accept compatible snake-case spellings; canonical names take precedence. Luau maps external callback keys to the same table spellings. **Stop** is not a lifecycle callback; **OnStart** is not Lua’s **Start**. Use [Lifecycle callbacks](/docs/callbacks) for language registration. Collision names may exist in the architecture but the primitive simulator does not emit collision/touch callbacks.

## When mutations take effect

| Runtime / operation | Execution behavior |
| --- | --- |
| Embedded Lua 5.4 core writes | Host methods update the Play world immediately, including translation, attributes and properties. `instance.add/clone` return the new stable ID immediately. |
| Embedded JavaScript / Web core writes | Translation, property/attribute writes, enabled state, camera selection, logging and instance creation are collected and applied in order after a successful callback. Reads use the callback snapshot; creation returns no new entity ID. A canonical scene-object API call can flush these commands before resolving its target. |
| External SDKs: Python, C, C++, C#, Luau, Java, PHP | Core commands normally commit with the callback response. A synchronous query flushes earlier commands in order before evaluating the query. Simple snapshot getters still use lifecycle state, so flushing does not refresh that snapshot. |
| Synchronous gameplay queries | Evaluate when called. Examples include physics queries/impulses, environment updates and audio controls. Embedded JavaScript queries normally do not flush earlier queued core writes. Canonical `game.scene.Scene.Object` target resolution flushes earlier commands before resolving the live path; this also applies to HTML inline JavaScript. |
| Scheduled actions / events | Actions are registered and advanced by the shared scene clock. Events/completion callbacks are delivered through the scheduler, not by a direct call into another script’s VM. |

These distinctions describe the current adapters, not a transaction guarantee. In particular a Lua write already applied before a later error is not automatically rolled back. Keep order-sensitive operations explicit and avoid assuming a later getter sees a deferred write. API 1.1 is the gameplay API capability version; it is unrelated to Docs v0.1.

## Communicate across scripts

Use [Events and signals](/docs/api/events) for engine-owned queued messages and object-scoped signals. Directly importing another attached behavior’s VM object or calling its lifecycle method is not provided. Private module variables belong to each behavior instance. The runtime owns cross-language boundary values and script isolation.

## Language-specific guides

- [C](/docs/scripting/c), [C++](/docs/scripting/cpp), [C#](/docs/scripting/csharp)
- [Python](/docs/scripting/python), [JavaScript](/docs/scripting/javascript)
- [Lua 5.4](/docs/scripting/lua), [Luau](/docs/scripting/luau)
- [Java](/docs/scripting/java), [PHP](/docs/scripting/php), [HTML/CSS](/docs/scripting/web)

## Errors, reload and performance

Inspect Console diagnostics and click source locations to open the external editor. Callback failures disable the failing behavior; validation failure during reload keeps the last good instance. Restart Play after fixing source for a clean baseline.

Lua/QuickJS are isolated embedded runtimes. External languages use persistent child sessions and engine-supplied SDKs; do not print protocol data or invent a network service. There are source/response bounds and callback timeouts. Per-instance runtimes/processes, synchronous queries and frequent logs have costs; this documentation makes no benchmark claims. Use engine-scheduled actions for time-based work and avoid per-frame log flooding. See [Runtime architecture](/docs/open-source/engine/scripting-architecture) and [Sandbox and Play safety](/docs/guides/gameplay-programming/sandbox-and-play-safety).

Optional AI/MCP workflows live in [Advanced agent integration](/docs/guides/ai-agents); they are not prerequisites for making a game.
