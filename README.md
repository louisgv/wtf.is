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

+ All code should be in `/src`
+ Do `npm link` to install the cli
+ Run build -> profit
