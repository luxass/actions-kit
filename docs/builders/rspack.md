# Rspack Builder

Build GitHub Actions using Rspack.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/rspack-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/rspack-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/rspack-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/rspack-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import rspack from "@actions-sdk/rspack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: rspack({
    ...rspackOptions,
  }),
});
```

### Customizing Rspack

You can customize the Rspack options by passing the options directly into the `rspack` function.

```ts [actions-kit.config.ts]
import rspack from "@actions-sdk/rspack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: rspack({
    ...rspackOptions,
  }),
});
```
