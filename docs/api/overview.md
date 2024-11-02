# Overview

The `@actions-sdk/utils` is a collection of utility functions that can be used to simplify the development of GitHub Actions.

> [!NOTE]
> If you are using `actions-kit`, you don't need to install this package yourself. The utility functions are already included in the `actions-kit` package.

## Installation

::: code-group

```bash [pnpm]
pnpm add @actions-sdk/utils
```

```bash [yarn]
yarn add -D @actions-sdk/utils
```

```bash [npm]
npm install -D @actions-sdk/utils
```

```bash [bun]
bun install -D @actions-sdk/utils
```

:::

If you are using Actions Kit, you can import the utility functions directly from the package:

```ts
// for all utility functions
import * aku from "actions-kit/utils";

// for specific utility functions
import { isPr } from "actions-kit/utils/events";
```

Otherwise, you can import the functions directly from the package:

```ts
import { isPr } from "@actions-sdk/utils";
```

There are exports available for each entry in the sidebar, which you can use to import the utility functions directly from the package.
