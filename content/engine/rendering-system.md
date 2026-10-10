# Rendering System

Rustic owns its graphics interface in `engine-rhi`. The `renderer-wgpu` crate translates those contracts into wgpu operations and WGSL shaders. Public adapter interfaces keep wgpu device, queue, surface, and other backend types internal.

## Graphics backends and automatic selection

`BackendRequest::Auto` in `Engine/crates/renderer-wgpu/src/lib.rs` tries platform candidates in an explicit order:

| Platform | Current automatic order |
| --- | --- |
| Windows | Dedicated Vulkan adapters, then DX12, Vulkan, and GL/GLES compatibility |
| Linux and other non-Windows/non-macOS builds | Vulkan, then GL/GLES compatibility |
| macOS | Metal |

A candidate must initialize successfully; native surface creation also requires a compatible presentation format. Failed attempts are collected into diagnostics. An explicit backend request restricts the candidate set, so it is useful for reproducing backend-specific failures.

`engine-rhi::select_renderer` is a separate deterministic policy over supplied candidates. It rejects candidates without presentation/baseline support and uses supplied capability, stability, memory, benchmark, and power-policy information. Its quality classification is policy code; it does not itself inventory hardware or benchmark a machine.

## Rendering paths

The adapter supports deterministic offscreen targets and live native surfaces. Scene extraction converts authored ECS data into rendering inputs; editor frames include viewport data without exposing backend-native resources. Inspect the adapter diagnostics when reporting a wrong-GPU or startup failure, and include the OS, GPU, driver, and attempted backend.

## Performance and current limits

Measure an optimized build with a reproducible scene and fixed viewport size. Compare CPU work, GPU work, asset loading, and frame transfer separately before changing backend preference. Keep expensive imports and script compilation away from frame callbacks, and qualify changes on available hardware as well as headless fixtures.

The architecture baseline describes future probe processes, cached hardware scores, crash recovery, and adaptive quality. Do not document those as active startup behavior without matching implementation and tests. New graphics work belongs behind the [engine boundaries](/docs/open-source/engine/architecture), with backend fallback and resource-lifetime checks.
