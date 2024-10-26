---
title: Autocomplete
---

# Autocomplete

We are using `unplugin-actions-kit` under the hood, which allows us to provide a better developer experience by enabling autocomplete for your action's inputs and outputs.

## Enabling Autocomplete

To enable autocomplete, you need to add the following configuration to your `actions-kit.config.ts` file:

```typescript
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  autocomplete: true, // possible values: `outputs`, `inputs` or `true`
});
```

This will generate a `actions-kit.d.ts` file which will overload the `getInput` and `setOutput` functions to provide autocomplete for your action's inputs and outputs.
