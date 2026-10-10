# Hosting SDK repository

[Open the hosting SDK repository on GitHub](https://github.com/Rustic-Game-Engine/hosting-sdk).

The public hosting SDK repository is intended for software that integrates cloud game-server deployment, autoscaling, monitoring, and infrastructure management. It is a separate project from the native engine, examples, and documentation site.

## Current contents and development language

As checked on 10 October 2026, the default branch contains **only `LICENSE`**, under Apache 2.0. No SDK implementation, package manifest, README, API specification, scripts, or release package is published there yet. An implementation language and supported runtimes have not been established by the available source.

The repository description explains its intended purpose; it does not mean deployment, scaling, or monitoring APIs are available to call today. This public repository is also separate from the organization's private managed cloud platform.

## Prerequisites

Git is enough to inspect or fork the current contents. There is no published SDK-specific prerequisite list, language toolchain, package installation command, cloud credential setup, or game-server compatibility matrix yet.

Building the Rust engine does not install this SDK. Do not assume it is a Rust crate, npm package, or Python package until a supported manifest and release are published.

## Start your own version

Fork the repository and replace `YOUR_ACCOUNT`:

```sh
git clone https://github.com/YOUR_ACCOUNT/hosting-sdk.git
cd hosting-sdk
git switch -c design-sdk-foundation
```

This creates a workspace for your own implementation; it does not produce a functioning SDK. Before adding infrastructure code, coordinate with maintainers on the intended language, service protocol, and first supported workflow.

Useful first steps for a fork or initial contribution:

1. Write a README defining the scope, supported runtime, installation plan, and public service contract.
2. Select a language and package format based on the consumers you want to support, then document its toolchain and versions.
3. Specify the request/response model, authentication, timeouts, errors, retries, and version compatibility before writing a client.
4. Implement one small operation against a documented service or local mock, with reproducible tests.
5. Add an example that uses placeholder configuration and states its expected result. Keep actual credentials out of source and logs.
6. Document development, build, test, and release commands once those scripts exist.

These are proposed starting points, not implemented SDK features or a published roadmap. Until a service protocol exists, a local mock can demonstrate your client design without suggesting the production platform supports it.

## Main scripts and implementation entry points

There are currently **no main scripts, source modules, build commands, or release workflows** to explain. The only published file is the license. Revisit the repository's source and documentation before depending on any future package or API.

For a new SDK implementation, a useful layout would separate protocol models, transport/authentication, client operations, tests, and examples. Document that layout alongside the actual code rather than presenting a proposed structure as current source.

## License and related projects

The repository has an Apache 2.0 license. Preserve its license and relevant notices in a fork, and check dependency licenses if you add an implementation.

Use the [engine guide](/docs/engine) for the native game runtime and [examples guide](/docs/open-source/examples) for gameplay samples. Neither currently documents a runnable public hosting SDK integration. Return to the [repository directory](/docs/open-source) to compare all public projects.
