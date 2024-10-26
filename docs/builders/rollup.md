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

export default defineConfig({
  builder: "rollup",
});
```

> [!TIP]
> If you are using TypeScript, you will have to either add `@actions-sdk/rollup-builder/types` to `compilerOptions.types` or add a triple slash directive to the top of your file.

```ts
/// <reference types="@actions-sdk/rollup-builder/types" />
```

### Customizing Rollup

You can customize the Rollup options by adding an `rollup` key to your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "rollup",
  rollup: {},
});
```
