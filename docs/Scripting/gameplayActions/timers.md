# Schedule timers

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  Timer.after(2, function() print("delayed") end)
  local repeating = Timer.every(0.5, function() print("tick") end, 4)
  repeating.pause()
  repeating.resume()
  -- repeating.cancel() prevents subsequent delivery.
end }
```

`Timer.every(interval, callback, count?)` requires a positive interval/count. Omit
count to repeat until cancelled. Large frame deltas preserve leftover time and may
queue several ticks. Infinite zero-duration action loops fail within a bounded
step budget. Callback execution itself is still subject to the language runtime's
budget/deadline; keep callbacks short.
