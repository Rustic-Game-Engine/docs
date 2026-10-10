# Start your own version

[Back to Hosting SDK repository](/docs/open-source/hosting-sdk).

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
