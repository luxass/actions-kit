# Getting Started

## Installation

:::code-group

```bash [npm]
npm install actions-kit
```

```bash [pnpm]
pnpm add actions-kit
```

```bash [yarn]
yarn add actions-kit
```

```bash [bun]
bun install actions-kit
```

:::

## Usage

```typescript
import { getSafeValidatedInput } from "actions-kit";

const input = getSafeValidatedInput("input-name", { required: true });
```

> [!NOTE]
> Browse the [API Reference](../api/overview.md) for more information.
