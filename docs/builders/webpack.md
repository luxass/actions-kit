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
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "webpack",
});
```

> [!TIP]
> If you are using TypeScript, you will have to either add `@actions-sdk/webpack-builder/types` to `compilerOptions.types` or add a triple slash directive to the top of your file.

```ts
/// <reference types="@actions-sdk/webpack-builder/types" />
``` 

### Customizing Webpack

You can customize the Webpack options by adding an `webpack` key to your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  builder: "webpack",
  webpack: {},
});
```
