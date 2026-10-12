# Play and fade audio

[Back to Use gameplay actions](/docs/guides/gameplay-actions).

## Supported file types

| Audio type | File extensions |
| --- | --- |
| WAV (integer or floating-point PCM) | `.wav` |
| MP3 | `.mp3` |
| AAC-LC | `.aac` (ADTS), `.m4a` (MP4) |
| FLAC | `.flac` |
| OGG Vorbis | `.ogg`, `.oga` |
| OGG Opus (mono or stereo) | `.ogg`, `.oga`, `.opus` |

Place audio files in your project's `assets/` folder. These types work with
`:load()` in Lua/Luau and `Audio.play` / `Audio.playAt` in every supported script
language. See [Audio API: supported audio files](/docs/api/audio#supported-audio-files)
for codec limitations and memory limits.

## Play and fade

Follow [Set up gameplay actions](/docs/guides/gameplay-actions/setup) before running this Lua example.

```lua
return { Start = function()
  local music = Audio.play("assets/music.ogg", {loop=true, volume=0})
  Audio.fadeIn(music, 2, Ease.InSine)
  Timer.after(5, function() Audio.fadeOut(music, 1, Ease.OutSine) end)
end }
```

`play` decodes WAV, MP3, AAC, FLAC, and OGG into a retained PCM voice; `playAt(source, position, options?)`
adds distance attenuation relative to the active camera. A voice has an ID and
`pause`, `resume`, `stop` controls. `volume(voice, value)` and `pitch(voice, value)`
change playback parameters; fades and crossfades are scheduler actions with easing.
`crossfade(oldVoice, newVoice, duration, easing?)` fades old volume to zero and new
volume from zero to one in parallel. Stopping a voice cancels actions targeting it
on the next scheduler tick. Finished non-looping voices release their PCM storage unless the clip is retained by a loaded audio handle.

The PCM mixer runs on every platform. Windows player output feeds the default
audio device through a bounded queue; other platforms currently provide headless
mixing. Library tests verify PCM consumption and voice controls without a device.

## Load and control audio objects (Lua and Luau)

Create `assets/sounds/` in your project and place `crash.wav` there (WAV, MP3, AAC, FLAC, and OGG are supported). Create a Lua or Luau Object Component script, attach it to an
enabled scene object, and press **Play**. Use `Start` to load audio before playing:

```lua
local crashA
return {
  Start = function()
    crashA = rustic.game.assets.sounds["crash.wav"]:load()
    crashA:play()
    Timer.after(0.1, function() crashA:pause() end)
    Timer.after(0.2, function() crashA:resume() end)
    Timer.after(1, function() crashA:stop() end)
    Timer.after(2, function() crashA:play() end)
    Timer.after(3, function() crashA:Unload() end)
  end
}
```

You should hear the clip, pause briefly, then hear it again at two seconds if
running the Windows player. Other platforms currently mix without device sound.
A short clip may finish before the pause timer fires; controls on a loaded clip
with no active playback are harmless.

- Directory keys follow the project `assets/` directory. Brackets preserve file
  extensions, spaces, and dots: `rustic.game.assets["sound effects"]["crash.wav"]`.
  These are asset paths; audio scene components are not required.
- `:load()` decodes and retains the audio without playing, returning a reusable
  audio handle. `Audio.load("assets/sounds/crash.wav")` returns the same kind of
  handle. Calling `:load()` on an already loaded handle returns that handle.
- `:play(options?)` requires a successful load and starts from the beginning,
  replacing that handle's previous playback. Options are `loop`, `volume`,
  `pitch`, and optional world `position`. It returns a voice compatible with
  `Audio.volume`, `Audio.pitch`, and fades.
- `:stop()` stops playback but keeps the clip loaded. `:pause()` preserves the
  current playback position; `:resume()` continues it. Resume after stop or
  natural completion does not restart the clip; use `:play()`.
- `:Unload()` (also `:unload()`) stops playback and frees the handle's decoded PCM.
  Repeated unloads are harmless. Call `:load()` again before playing that handle.
  Stopping or natural completion retains loaded PCM for replay until unload or
  owner cleanup. Separate calls on an asset path create separate handles.
- Loaded clips and their voices clean up with the owning script on destruction,
  disable, successful reload, or Stop. A scene supports at most 1024 loaded clips
  and 1024 playback voices.
- Playing an asset proxy directly or a handle after unload raises a load-first
  error. Missing, unsupported, or invalid files fail during `load()`. Check the
  Console, attachment, file name and extension. Paths must stay inside `assets/`.

The object methods and `Audio.load` are available in Lua 5.4 and Luau. Existing
`Audio.play(source, options?)` and `Audio.playAt` in all languages still decode
and play immediately; their voice controls continue to work.

## Record audio and read a hot microphone (Lua and Luau)

Create a Lua or Luau Object Component script in `scripts/`, attach it to an
**enabled** scene object, and press **Play**. Start capture inside `Start` or
another callback. Capture methods use camel case and colon syntax:

```lua
local rec
return {
  Start = function()
    rec = rustic.game:startRecording()
  end,
  OnStop = function()
    rec:stopRecording()
    local packet = rec:read()
    -- packet.samples contains interleaved floating-point PCM.
    -- Keep reading until #packet.samples == 0 to consume the recording.
    print(packet.sampleRate, packet.channels, #packet.samples)
    rec:unload()
  end
}
```

`rustic.game:startRecording(path?, options?)` returns a script-owned recording
handle. With no path it retains audio in memory, so the variable remains usable
after `:stopRecording()`. The default source is game mixer output: 48,000 Hz,
stereo, interleaved float PCM. This records audio, not video. Scene clock scaling
and paused playback affect the game audio being recorded.

To write a WAV file as well, pass a new `.wav` filename:

```lua
local rec = rustic.game:startRecording("C:/Users/YourName/Recordings/session.wav")
-- Later, inside a callback:
rec:stopRecording() -- finalizes the WAV header; returns rec
```

Use an absolute path to keep the file outside the temporary play snapshot.
Relative paths resolve inside the runtime snapshot directory. Parent directories
must already exist. Capture creates a new file and refuses to overwrite an
existing file. The output is a 32-bit floating-point WAV, retaining the same PCM
in the handle. A missing directory, invalid extension or unwritable destination
raises a script error at start; catch expected failures with `pcall`.

On Windows, microphone recording uses the default input device:

```lua
local rec = rustic.game:startRecording(nil, {source = "microphone"})
-- Or pass a .wav path as the first argument to also write it to disk.
rec:stopRecording()
```

Hot mic capture exposes local input immediately, without retaining a full recording:

```lua
local mic
return {
  Start = function()
    mic = rustic.game:startHotMic()
  end,
  Update = function()
    local packet = mic:read()
    local peak = 0
    for _, sample in ipairs(packet.samples) do
      peak = math.max(peak, math.abs(sample))
    end
    -- Feed packet.samples, packet.sampleRate and packet.channels to your
    -- audio processing or relay code. peak can drive a microphone meter.
  end,
  OnStop = function()
    mic:stopHotMic()
    mic:unload()
  end
}
```

- `rec:read()` and `mic:read()` return `{samples, sampleRate, channels, active,
  droppedSamples}`. Each call consumes at most 4,096 samples, preserving complete
  channel frames. An empty sample list means no queued data is available.
- Samples are interleaved by channel. Microphone rate/channel count come from the
  default device; input is converted to finite float samples in `[-1, 1]`.
- Hot mic queues at most two seconds of input. Read regularly, using multiple
  reads if needed. `droppedSamples` reports input discarded since the preceding
  read. Stopping hot mic closes the device and discards unread input.
- `rustic.game:stopRecording(rec)` and `rustic.game:stopHotMic(mic)` stop one
  handle. Omit the handle to stop all matching captures owned by the script.
  Handles also support `:stop()`; stopping repeatedly is safe.
- Recordings retain at most 64 MiB of PCM per handle (about 175 seconds of game
  audio), including recordings written to files. Exceeding the limit stops
  capture; `read`/`stopRecording` report the error. Split long recordings into
  separate handles and call `:unload()` after consuming them. A script may retain
  at most four capture handles at once.
- Destroying an owner, ending Play or successful reload closes its microphone,
  finalizes its WAV files and releases its capture handles. Other scripts cannot
  use those handles. Explicit stop callbacks let you read samples before cleanup.
- Microphone capture currently requires Windows, an available default microphone,
  and OS microphone access. Default F32, I16 and U16 device formats are supported.
  Missing devices, permission failures, unsupported formats, startup timeouts and
  device disconnection raise errors. Game mixer recording works headlessly too.
- These convenience bindings are available in Lua 5.4 and Luau. Hot mic supplies
  local PCM; automatic network transport and speaker monitoring are not provided.
