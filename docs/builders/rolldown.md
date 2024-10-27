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
import rolldown from "@actions-sdk/rolldown-builder";

export default defineConfig({
  builder: rolldown({
    ...rolldownOptions,
  }),
});
```

### Customizing Rolldown

You can customize the Rolldown options by passing the options directly into the `rolldown` function.

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import rolldown from "@actions-sdk/rolldown-builder";

export default defineConfig({
  builder: rolldown({
    ...rolldownOptions,
  }),
});
```
