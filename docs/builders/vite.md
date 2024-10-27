# Vite Builder

Build GitHub Actions using Vite.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/vite-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/vite-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/vite-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/vite-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import vite from "@actions-sdk/vite-builder";

export default defineConfig({
  builder: vite({
    ...viteOptions,
  }),
});
```

### Customizing Vite

You can customize the Vite options by passing the options directly into the `vite` function.

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import vite from "@actions-sdk/vite-builder";

export default defineConfig({
  builder: vite({
    plugins: [],
  }),
});
```
