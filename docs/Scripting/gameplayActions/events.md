# Send events and object signals

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  Events.once("DoorOpened", function(playerId)
    print("opened by", playerId)
  end)
  Events.emit("DoorOpened", { rustic.entity_id() })
end }
```

`Events.on(name, callback)` persists; `once` runs once. Both return a connection
with `disconnect()`. `Events.connect(object, name, callback)` listens to that
object's signal; emit it with `Events.emit(name, arguments, object)`. Global events
are distinct from object signals. Payloads are booleans, strings (including stable
entity IDs), numbers, vectors, and quaternions; arbitrary tables are not supported.
At most 64 arguments are allowed; each string is limited to 4096 bytes and the
combined payload is limited to 16 KiB. All supported language instances can communicate across language boundaries
inside the same play scene. Events are dispatched during `Update` before the
user's frame callback; emitting does not synchronously invoke another VM.
