# Webpack Builder

Build GitHub Actions using Webpack.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/webpack-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/webpack-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/webpack-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/webpack-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import webpack from "@actions-sdk/webpack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: webpack({
    ...webpackOptions,
  }),
});
```

### Customizing Webpack

You can customize the Webpack options by passing the options directly into the `webpack` function.

```ts [actions-kit.config.ts]
import webpack from "@actions-sdk/webpack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: webpack({
    ...webpackOptions,
  }),
});
```
