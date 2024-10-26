# unplugin-actions-kit

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Generate TypeSafety for GitHub Actions. Powered by [unplugin](https://github.com/unjs/unplugin).

> [!NOTE]
> Documentation is available [here](https://actions-kit.pages.dev)

## Installation

```bash
pnpm install -D unplugin-actions-kit
```

## Usage

<details>
<summary>Vite</summary><br/>

```ts
// vite.config.ts
import ActionsKitPlugin from "unplugin-actions-kit/vite";

export default defineConfig({
  plugins: [
    ActionsKitPlugin({
      /* options */
    }),
  ],
});
```

<br/></details>

<details>
<summary>Rollup</summary><br/>

```ts
// rollup.config.js
import ActionsKitPlugin from "unplugin-actions-kit/rollup";

export default {
  plugins: [
    ActionsKitPlugin({
      /* options */
    }),
  ],
};
```

<br/></details>

<details>
<summary>Webpack</summary><br/>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require("unplugin-actions-kit/webpack").default({
      /* options */
    }),
  ],
};
```

<br/></details>

<details>
<summary>esbuild</summary><br/>

```ts
// esbuild.config.js
import { build } from "esbuild";
import ActionsKitPlugin from "unplugin-actions-kit/esbuild";

build({
  /* ... */
  plugins: [
    ActionsKitPlugin({
      /* options */
    }),
  ],
});
```

<br/></details>

<details>
<summary>Rspack</summary><br/>

```ts
// rspack.config.mjs
import ActionsKitPlugin from "unplugin-actions-kit/rspack";

/** @type {import("@rspack/core").Configuration} */
export default {
  plugins: [
    ActionsKitPlugin({
      /* options */
    }),
  ],
};
```

<br/></details>

<details>
<summary>Rolldown (Experimental)</summary><br/>

```ts
// rolldown.config.js
import { defineConfig } from "rolldown";
import ActionsKitPlugin from "unplugin-actions-kit/rolldown";

export default defineConfig({
  input: "./index.js",
  plugins: [
    ActionsKitPlugin({
      /* options */
    }),
  ],
});
```

<br/></details>

## Configuration

### `actionPath`

The path to the `action.yml` or `action.yaml` file.  
If not provided, it will look for `action.yml` or `action.yaml` in the root directory.

- **Type:** `string`
- **Default:** `null`

### `inject`

Inject `inputs` and `outputs` into the global scope.

- **Type:** `boolean | "inputs" | "outputs"`
- **Default:** `null`

### `autocomplete`

Enable Autocomplete.

- **Type:** `boolean`
- **Default:** `true`

### `outputPath`

The output path for the generated TypeScript file.  
If not provided, it will use the directory where the `action.yml` or `action.yaml` file is located.

- **Type:** `string`
- **Default:** `null`

## 📄 License

Published under [MIT License](./LICENSE).

[npm-version-src]: https://img.shields.io/npm/v/unplugin-actions-kit?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/unplugin-actions-kit
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-actions-kit?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/unplugin-actions-kit
