# Versioning

The website currently publishes one catalog and one set of documentation routes. It has no implemented version selector or automatic versioned archive. The npm package version is a website package version, not a guarantee that every guide targets an identically numbered engine release.

## Maintain the current set

Update published guides alongside engine changes and identify the implementation checked. The README records the original engine import commit; later updates must be reviewed against current sources. Use current limitations and explicit compatibility notes when older project formats or language adapters behave differently.

Do not confuse engine resource schema versions, Script API versions, Rust toolchain versions, and documentation release labels. These describe different contracts. For example, scene schema migration belongs in a scene guide, while a pinned compiler belongs in source-build instructions.

## Propose multiple engine versions

Before publishing an archive, agree on which engine releases remain supported and who maintains each set. A possible design is version-qualified catalog slugs such as `versions/0.1/...` with independent sources. That is a proposed convention, not an existing route family.

A complete implementation must make version identity visible in navigation, metadata, search, internal links, and previous/next pagination. Keep archived text tied to a release/commit; do not silently replace old behavior with current behavior. Define where unversioned routes point and preserve old links with explicit aliases where appropriate.

## Review a version update

Check that commands, APIs, prerequisites, and screenshots/examples all match the target engine release. Verify every exported version route and cross-version link, and make search results clearly identify their version. Include migration links for changed project or API behavior.

For now, add accurate compatibility notes to the current guide rather than inventing a version dropdown or archive URL. Submit any version-system change as website implementation work with its documentation; see [Adding Documentation](/docs/open-source/docs/adding-documentation).
