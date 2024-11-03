# @actions-sdk/actions-schema

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

## Installation

```bash
pnpm install @actions-sdk/action-schema
```

## Usage

```ts
import { ACTION_SCHEMA } from "@actions-sdk/action-schema";

const action = {
  name: "Actions Kit Playground 2",
  description: "An Action built using Actions Kit",
  author: "luxass",
  branding: {
    color: "purple",
    icon: "package",
  },
  inputs: {
    name: {
      description: "Your name",
      required: true,
      default: "World",
    },
  },
  runs: {
    using: "node20",
    main: "index.cjs",
  },
};

const result = ACTION_SCHEMA.parse(action);

console.log(result);
```

## 📄 License

Published under [MIT License](./LICENSE).

[npm-version-src]: https://img.shields.io/npm/v/@actions-sdk/action-schema?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/@actions-sdk/action-schema
[npm-downloads-src]: https://img.shields.io/npm/dm/@actions-sdk/action-schema?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/@actions-sdk/action-schema
