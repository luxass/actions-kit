# Rolldown Builder

Build GitHub Actions using Rolldown.

> [!IMPORTANT] > [Rolldown](https://rolldown.rs) is still in a very new bundler, and may not work for all use cases.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/rolldown-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/rolldown-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/rolldown-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/rolldown-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "rolldown",
});
```

> [!TIP]
> If you are using TypeScript, you will have to either add `@actions-sdk/rolldown-builder/types` to `compilerOptions.types` or add a triple slash directive to the top of your file.

```ts
/// <reference types="@actions-sdk/rolldown-builder/types" />
```

### Customizing Rolldown

You can customize Rolldown by adding an `rolldown` key to your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "rolldown",
  rolldown: {
    plugins: [],
  },
});
```
