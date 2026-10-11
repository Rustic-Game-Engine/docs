// Individual API entries drive category indexes, routes, navigation and search.
// Shared setup, examples and constraints are read from each category's source.
export type ApiCall = { slug: string; title: string; signature: string; description: string };
export type ApiCategory = { slug: string; source: string; calls: ApiCall[] };

function category(slug: string, source: string, signatures: string[]): ApiCategory {
  const segments = new Set<string>();
  return { slug: `api/${slug}`, source, calls: signatures.map((signature) => {
    const name = signature.split("(")[0];
    const method = name.split(/[.:]/).pop()!;
    // Include the receiver when a category exposes both service and handle calls.
    const receiver = name.split(/[.:]/).slice(0, -1).join(".");
    const local = ["voice", "handle", "connection", "builder", "rec", "mic", "capture"].includes(receiver);
    let segment = `${local ? `${receiver}-` : ""}${method}`
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2").replaceAll("_", "-").toLowerCase();
    if (segments.has(segment)) segment = `${receiver.split(".").pop()!.toLowerCase()}-${segment}`;
    segments.add(segment);
    return {
      slug: `api/${slug}/${segment}`,
      title: `${name}${signature.includes("(") ? "()" : ""}`,
      signature,
      description: `Signature, parameters, timing and usage for ${name}.`,
    };
  }) };
}

export const apiCategories: ApiCategory[] = [
  category("animation", "docs/Scripting/API/animation.md", [
    "Animation.clips(entity)",
    "Animation.load(entity, source)",
    "Animation.register(entity, clip)",
    "Animation.addMarker(entity, clipName, time, name)",
    "Animation.play(entity, clipName, options?)",
    "Animation.blend(entity, fromClip, toClip, options?)",
    "Animation.transition(entity, fromClip, toClip, options?)",
    "Animation.stop(handle)",
    "Animation.pause(handle)",
    "Animation.speed(handle, value)",
    "Animation.loop(handle, enabled)",
    "handle.stop()",
    "handle.speed(value)",
    "handle.loop(enabled)",
    "handle.onMarker(name, callback)",
    "Animation.value(keys, onUpdate)",
    "Animation.ik(root, middle, tip, target, options?)",
    "Animation.footPlacement(root, middle, tip, target, options?)",
    "Animation.lookAt(entity, position, duration, easing?)",
    "Animation.headTracking(entity, position, duration, easing?)",
    "Animation.recoil(entity, quaternion, duration, easing?)",
  ]),
  category("audio", "docs/Scripting/API/audio.md", [
    "Audio.play(source, options?)",
    "Audio.playAt(source, position, options?)",
    "voice.pause()",
    "voice.resume()",
    "voice.stop()",
    "Audio.volume(voice, value)",
    "Audio.pitch(voice, value)",
    "Audio.fadeIn(voice, duration, easing?, volume = 1)",
    "Audio.fadeOut(voice, duration, easing?)",
    "Audio.crossfade(oldVoice, newVoice, duration, easing?)",
    "rustic.game:startRecording(path?, options?)",
    "rustic.game:stopRecording(recording?)",
    "rustic.game:startHotMic()",
    "rustic.game:stopHotMic(mic?)",
    "rec:stopRecording()",
    "mic:stopHotMic()",
    "capture:read()",
    "capture:stop()",
    "capture:unload()",
  ]),
  category("camera-actions", "docs/Scripting/API/camera-actions.md", [
    "Camera.current()",
    "Camera.moveTo(camera, position, duration, easing?)",
    "Camera.zoom(camera, fov, duration, easing?)",
    "Camera.fov(camera, fov, duration, easing?)",
    "Camera.lookAt(camera, position, duration, easing?)",
    "Camera.follow(camera, target, duration, easing?, offset?)",
    "Camera.orbit(camera, center, radius, turns, duration, easing?)",
    "Camera.shake(camera, strength, duration, easing?)",
    "Camera.transition(camera, position, quaternion, fov, duration, easing?)",
  ]),
  category("clock", "docs/Scripting/API/clock.md", [
    "Clock.timeScale(scale)",
    "Clock.pause()",
    "Clock.resume()",
    "Clock.state()",
  ]),
  category("ease", "docs/Scripting/API/ease.md", [
    "Ease.Linear",
    "Ease.InSine",
    "Ease.OutSine",
    "Ease.InOutSine",
    "Ease.InQuad",
    "Ease.OutQuad",
    "Ease.InOutQuad",
    "Ease.InCubic",
    "Ease.OutCubic",
    "Ease.InOutCubic",
    "Ease.InQuart",
    "Ease.OutQuart",
    "Ease.InOutQuart",
    "Ease.InQuint",
    "Ease.OutQuint",
    "Ease.InOutQuint",
    "Ease.InExpo",
    "Ease.OutExpo",
    "Ease.InOutExpo",
    "Ease.InCirc",
    "Ease.OutCirc",
    "Ease.InOutCirc",
    "Ease.InBack",
    "Ease.OutBack",
    "Ease.InOutBack",
    "Ease.InElastic",
    "Ease.OutElastic",
    "Ease.InOutElastic",
    "Ease.InBounce",
    "Ease.OutBounce",
    "Ease.InOutBounce",
  ]),
  category("effects", "docs/Scripting/API/effects.md", [
    "Effects.fade(entity, opacity, duration, easing?)",
    "Effects.flash(entity, color, duration, easing?)",
    "Effects.shake(entity, strength, duration, easing?)",
    "Effects.pulse(entity, scale, duration, easing?)",
  ]),
  category("events", "docs/Scripting/API/events.md", [
    "Events.on(name, callback)",
    "Events.once(name, callback)",
    "Events.connect(entity, name, callback)",
    "Events.emit(name, arguments = [], source = null)",
    "connection.disconnect()",
    "Events.disconnect(connection)",
  ]),
  category("movement", "docs/Scripting/API/movement.md", [
    "Movement.move(entity, offset, timing, easing?)",
    "Movement.moveTo(entity, position, timing, easing?)",
    "Movement.rotateTo(entity, quaternion, timing, easing?)",
    "Movement.lookAt(entity, position, duration = 0, easing?)",
    "Movement.follow(entity, target, duration, easing?, offset?)",
    "Movement.orbit(entity, center, radius, turns, duration, easing?)",
  ]),
  category("operation-handles", "docs/Scripting/API/operation-handles.md", [
    "handle.state()",
    "handle.pause()",
    "handle.resume()",
    "handle.cancel()",
    "handle.reverse()",
    "handle.onFinished(callback)",
  ]),
  category("path", "docs/Scripting/API/path.md", [
    "Path.create(points, kind = \"Linear\")",
    "Path.follow(entity, path, options)",
  ]),
  category("sequence", "docs/Scripting/API/sequence.md", [
    "Sequence.new()",
    "Timeline.new()",
    "builder.move(entity, position, timing, easing?)",
    "builder.to(entity, property, value, timing, easing?)",
    "builder.animation(entity, clipName, options?)",
    "builder.wait(duration)",
    "builder.call(callback)",
    "builder.parallel(builders)",
    "builder.play()",
  ]),
  category("smooth", "docs/Scripting/API/smooth.md", [
    "Smooth.lerp(from, to, progress, easing?)",
    "Smooth.slerp(fromQuaternion, toQuaternion, progress, easing?)",
    "Smooth.inverseLerp(from, to, value)",
    "Smooth.remap(value, inMin, inMax, outMin, outMax)",
    "Smooth.smoothDamp(current, target, velocity, smoothTime, delta)",
  ]),
  category("timer", "docs/Scripting/API/timer.md", [
    "Timer.after(delay, callback)",
    "Timer.every(interval, callback, count?)",
  ]),
  category("tween", "docs/Scripting/API/tween.md", [
    "Tween.to(entity, property, to, timing, easing?)",
    "Tween.move(entity, position, timing, easing?)",
    "Tween.rotate(entity, quaternion, timing, easing?)",
    "Tween.scale(entity, scale, timing, easing?)",
    "Tween.value(from, to, timing, onUpdate, easing?)",
  ]),
  category("physics-actions/queries", "docs/Scripting/API/physics-actions/queries.md", [
    "Physics.raycast(origin, direction, distance, ignore?)",
    "Physics.sphereCast(origin, direction, distance, radius, ignore?)",
    "Physics.overlap(center, radius, ignore?)",
  ]),
  category("physics-actions/forces", "docs/Scripting/API/physics-actions/forces.md", [
    "Physics.force(entity, vector, delta?)",
    "Physics.impulse(entity, vector)",
    "Physics.knockback(entity, vector)",
    "Physics.launch(entity, velocity)",
    "Physics.explosion(center, radius, strength, ignore?)",
  ]),
  category("entity", "api:entity", [
    "rustic.entity_id()",
    "rustic.delta_time()",
    "rustic.fixed_delta_time()",
  ]),
  category("transforms", "api:transforms", [
    "rustic.get_translation()",
    "rustic.set_translation(x, y, z)",
  ]),
  category("properties", "api:properties", [
    "rustic.get_property(name)",
    "rustic.set_property(name, value)",
  ]),
  category("attributes", "api:attributes", [
    "rustic.get_attribute(name)",
    "rustic.edit_attribute(name, value)",
    "rustic.game.Scene.Root.Child.EditAttribute(name, value)",
  ]),
  category("input", "api:input", [
    "rustic.input(action)",
    "rustic.key(key)",
    "rustic.key_events()",
    "rustic.any_key_pressed()",
  ]),
  category("logging", "api:logging", [
    "rustic.log(level, message, fields?)",
    "print(...)",
    "warn(...)",
  ]),
  category("enabled", "api:enabled", [
    "rustic.set_enabled(enabled)",
  ]),
  category("environment", "api:environment", [
    "Game.scene.getEnvironment()",
    "Game.scene.setEnvironment(settings)",
    "Game.scene.setSkyTexture(path)",
  ]),
  category("scene", "api:scene", [
    "Game.scene.Find(path)",
    "Game.scene.List()",
    "rustic.find_entity(name_or_id)",
  ]),
  category("instances", "api:instances", [
    "instance.add(source, parent?)",
    "instance.clone(source, parent?)",
  ]),
  category("camera", "api:camera", [
    "Game.setCurrentCamera(source)",
  ]),
];
