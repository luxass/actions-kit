# Events

Available under `@actions-sdk/action-utils/inputs`.

This module contains utility functions for working with GitHub Actions inputs.

## Functions

### `getValidatedInput`

Gets the value of an input and validates it.

::: code-group

```ts [vanilla]
import { getValidatedInput } from "@actions-sdk/action-utils/inputs";

const input = getValidatedInput("name", (data) => {
  if (data === "luxass") {
    return data;
  }

  throw new Error("Invalid input");
});
```

```ts [zod]
import { getValidatedInput } from "@actions-sdk/action-utils/inputs";
import { z } from "zod";

const NameSchema = z.string().nonempty();

const inputSafeParse = getValidatedInput("name", NameSchema.safeParse);
const inputParse = getValidatedInput("name", NameSchema.parse);

const inputSafeParseAsync = await getValidatedInput("name", NameSchema.safeParseAsync);
const inputParseAsync = await getValidatedInput("name", NameSchema.parseAsync);
```

```ts [valibot]
import { getValidatedInput } from "@actions-sdk/action-utils/inputs";
import * as v from "valibot";

const NameSchema = v.string();

const input = getValidatedInput("name", NameSchema.parse);
```

:::
