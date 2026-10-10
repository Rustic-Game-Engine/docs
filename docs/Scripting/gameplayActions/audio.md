# Play and fade audio

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local music = Audio.play("assets/music.ogg", {loop=true, volume=0})
  Audio.fadeIn(music, 2, Ease.InSine)
  Timer.after(5, function() Audio.fadeOut(music, 1, Ease.OutSine) end)
end }
```

`play` decodes WAV/OGG into a retained PCM voice; `playAt(source, position, options?)`
adds distance attenuation relative to the active camera. A voice has an ID and
`pause`, `resume`, `stop` controls. `volume(voice, value)` and `pitch(voice, value)`
change playback parameters; fades and crossfades are scheduler actions with easing.
`crossfade(oldVoice, newVoice, duration, easing?)` fades old volume to zero and new
volume from zero to one in parallel. Stopping a voice cancels actions targeting it
on the next scheduler tick. Finished non-looping voices release their PCM storage.

The PCM mixer runs on every platform. Windows player output feeds the default
audio device through a bounded queue; other platforms currently provide headless
mixing. Library tests verify PCM consumption and voice controls without a device.
