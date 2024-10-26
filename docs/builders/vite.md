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

export default defineConfig({
  builder: "vite",
});
```

> [!TIP]
> If you are using TypeScript, you will have to either add `@actions-sdk/vite-builder/types` to `compilerOptions.types` or add a triple slash directive to the top of your file.

```ts
/// <reference types="@actions-sdk/vite-builder/types" />
```

### Customizing Vite

You can customize the Vite options by adding an `vite` key to your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "vite",
  vite: {
    plugins: [],
  },
});
```
