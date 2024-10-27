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
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "rspack",
});
```

> [!TIP]
> If you are using TypeScript, you will have to either add `@actions-sdk/rspack-builder/types` to `compilerOptions.types` or add a triple slash directive to the top of your file.

```ts
/// <reference types="@actions-sdk/rspack-builder/types" />
```

### Customizing Rspack

You can customize the Rspack options by adding an `rspack` key to your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "rspack",
  rspack: {},
});
```
