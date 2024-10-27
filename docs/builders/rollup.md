# Rollup Builder

Build GitHub Actions using Rollup.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/rollup-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/rollup-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/rollup-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/rollup-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import rollup from "@actions-sdk/rollup-builder";

export default defineConfig({
  builder: rollup({
    ...rollupOptions,
  }),
});
```

### Customizing Rollup

You can customize the Rollup options by passing the options directly into the `rollup` function.

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import rollup from "@actions-sdk/rollup-builder";

export default defineConfig({
  builder: rollup({
    ...rollupOptions,
  }),
});
```
