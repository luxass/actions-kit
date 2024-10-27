---
title: Configuration
---

# Configuration

It is highly recommended to use a configuration file to define the settings for your action. This makes it easier to manage and update your action in the future.

A fully configured `actions-kit.config.ts` file might look like this:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  writeYaml: true,
  action: {
    name: "Actions Kit ESBuild Example",
    description: "An Action built using Actions Kit with ESBuild Builder",
    author: "luxass",
    branding: {
      color: "purple",
      icon: "package",
    },
    inputs: {
      name: {
        description: "Your name",
        required: true,
        default: "World",
      },
    },
    runs: {
      using: "node20",
      main: "index.cjs",
    },
  },
  inject: true,
  builder: "rspack",
});
```

For the full list of supported configuration options, please refer to the [Configuration Reference](../config/index.md).
