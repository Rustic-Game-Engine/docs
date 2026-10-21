# Versions, compatibility and changes

| Identifier | Meaning | Where to check |
| --- | --- | --- |
| Docs v0.1 | This documentation website’s version. | Header and docs `package.json`; not an engine release. |
| Engine release/revision | The executable you installed or source commit you built. | [Engine releases](https://github.com/Rustic-Game-Engine/engine/releases) and your source checkout. |
| Script API 1.0 / 1.1 | Versioned scripting capability contract. API 1.1 adds shared gameplay actions. | Script manifest/source API declarations and per-function/language guides. |
| Project / scene schema version | Storage format used for persistence/migration. | [Scene System](/docs/open-source/engine/scene-system). |

The latest release observed on 12 October 2026 was **v0.5-Pre-Alpha**; this is a verified repository tag, not a version invented from the Docs v0.1 header. Release assets may encode a different packaging version. Source implementation can be newer than a released binary: this audit uses engine commit `017db99b7025eeda96acf21967664153a2df0795`.

## Engine and API changes

Installed Windows builds that include the automatic updater check for newer
GitHub releases, including pre-alpha releases. They prompt once per release and
keep a small **Update** title-bar button available after dismissal. After an
in-app update, the new version reopens the windows and projects closed for it.
Read [Automatic Windows updates](/docs/getting-started/installation#automatic-windows-updates)
for the one-time manual upgrade from older builds, Windows elevation prompts,
release matching and failure logs.

Read the actual [release notes](https://github.com/Rustic-Game-Engine/engine/releases) before upgrading. This page does not fabricate a changelog or promise that older installers support every currently documented API. Keep backups of authored projects and review schema migration/compatibility notes. [Feature status](/docs/reference/compatibility) lists current restrictions, including input, audio, UI and export.

## Documentation maintenance

Only one published docs version is maintained here. A historical archive/version selector is unnecessary until multiple versions exist. When engine behavior changes, update the published docs and matching engine-local guide, record the reviewed commit, and preserve old route aliases. See [Documentation maintenance](/docs/open-source/docs/maintenance).
