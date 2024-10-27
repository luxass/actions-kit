---
title: Builders
---

# Builders

Actions Kit makes building your actions a breeze with its powerful set of builders. Each builder leverages a specific bundler to package your action, ensuring optimal performance and compatibility.

## Available Builders

- **[ESBuild](/builders/esbuild)** - Lightning-fast builds with ESBuild.
- **[Rolldown](/builders/rolldown)** - Simplified builds using Rolldown.
- **[Rollup](/builders/rollup)** - Modular builds with Rollup.
- **[Rspack](/builders/rspack)** - Efficient builds using Rspack.
- **[Vite](/builders/vite)** - Next-generation builds with Vite.
- **[Webpack](/builders/webpack)** - Comprehensive builds using Webpack.

## Customizing Your Builder

Tailor your build process by passing options directly into the builder function. For instance, to switch to the Rollup builder, update your `actions-kit.config.ts` file like this:

```ts
import { defineConfig } from "actions-kit/config";
import rollup from "@actions-sdk/rollup-builder";

export default defineConfig({
  builder: rollup({
    // Customize Rollup options here
  }),
});
```

## Building your own Builder

Creating your own builder allows you to fully customize the build process. Here's how you can do it:

First, you'll need to install Actions Kit:

::: code-group

```bash [pnpm]
pnpm add actions-kit
```

```bash [yarn]
yarn add actions-kit
```

```bash [npm]
npm install actions-kit
```

```bash [bun]
bun install actions-kit
```

:::

<br />

Next, create a builder directory and an index.ts file within it. In this file, you'll import the necessary modules from `actions-kit/builder` and `actions-kit/builder-utils`:

```ts [custom-builder.ts]
import type { Builder } from 'actions-kit/builder';
import { inferOutputFilename } from 'actions-kit/builder-utils';

const customBuilder: Builder = {
  name: 'custom-builder',
  build: async (options) => {
    return [];
  },
};

export default customBuilder;
```

Finally, configure your custom builder in the actions-kit.config.ts file:

```ts [actions-kit.config.ts]
import { defineConfig } from 'actions-kit/config';
import customBuilder from './custom-builder';

export default defineConfig({
  builder: customBuilder,
});
```

With these steps, you can create and configure your own custom builder, giving you complete control over the build process.
