# Create and reopen a project

## Prerequisites

Obtain a complete engine build using [Requirements and installation](/docs/getting-started/installation). This guide uses the Project Manager and the editor, not the Rust source workspace.

## Create your project

1. Launch **Project Manager** and click **New project** (or **Create your first project** when the list is empty).
2. Enter a **Project name**, for example `FirstScene`.
3. Choose a writable parent directory with **Browse…**. The manager creates a project directory below that parent.
4. Select **Empty3d** for the beginner tutorial. Template names describe initial content; they do not promise complete game controllers.
5. Click **Create project**, then **Open project** on its card. The editor runs as a separate native application and opens the project’s default scene.

The project has a `project.engine` descriptor, scene data, scripts, assets and generated caches. It is distinct from the engine source. Do not manually create or edit JSON to attach your first script.

## Understand the first screen

Use the **Project** panel’s **Scene** tab to select objects, **Explorer** to find files, and **Inspector** to edit the selection. The viewport shows the authoring scene; the game camera controls what Play renders. Read [Editor manual](/docs/editor/overview) and then [Your first playable scene](/docs/tutorials/first-game).

The checked-in editor provides scene saving and opens the project’s default scene. This guide uses that scene; it does not assume a **New Scene** wizard or arbitrary scene-switching menu exists. Scene formats and migration are described in [Scene System](/docs/open-source/engine/scene-system).

## Save and reopen

1. Use **File > Save scene** after changing objects, cameras or attachments. Save script edits in your external code editor too.
2. Stop Play before closing. Choose **Discard** in the runtime-change review if you want to keep the original authoring transforms.
3. Close the editor. Open the project again from its Project Manager card.
4. For an existing project not in the list, use **Import…**, browse to the project location and click **Import project**. Importing registers an existing project; it does not import a model asset.

If edits are read-only, check for another editor instance holding the project lock or an unsupported future scene format. Preserve your project and inspect Diagnostics before attempting recovery. See [Troubleshooting](/docs/troubleshooting).
