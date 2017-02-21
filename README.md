# What the fuck is

It basically tell you what the fuck is that file, what it is suppose to do, and how to open/work with it.

This program uses the following feature to identify a file:

```
+ File meta-data (name, type, etc)
+ Current directory
+ Sibling files
+ File content (must specified if allowed or not. Default: false)
+
```

At the end, it will return a description, which if called via the public api, will return this JSON:

```json
{
  "name" : "package.json",
  "executable": "false"
}
```

## For developer

1. Coding:

  - All code should be in `/src`
  - Do `npm link` to install the cli
  - Run build -> profit

2. Committing:

  - Use `npm run commit` instead of `git commit` (We're using comitizen)

3. Publishing:

  - Do a PR.

## Source Order:

- ./package.json
- ./bin
- ./src

> NOTE: This is a guide to Read and Partially understand this repos. Just go through them in this order. If you asked why, then the reason is probably because you are not the main contributor to this repo! Dood

## License

MIT, dood!
