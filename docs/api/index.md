# Inputs

## `getSafeValidatedInput`

```typescript
import { getSafeValidatedInput } from "actions-kit";
import { z } from "zod";

const input = getSafeValidatedInput("input-name", z.string());
// safely parses the input using `safeParse`
```

## `getValidatedInput`

```typescript
import { getValidatedInput } from "actions-kit";
import { z } from "zod";

const input = getValidatedInput("input-name", z.string());
// throws if the input is not valid
```

## `getSafeValidatedInputAsync`

```typescript
import { getSafeValidatedInputAsync } from "actions-kit";
import { z } from "zod";

const input = await getSafeValidatedInputAsync("input-name", z.string());
// safely parses the input using `safeParseAsync`
```

## `getValidatedInputAsync`

```typescript
import { getValidatedInputAsync } from "actions-kit";
import { z } from "zod";

const input = getValidatedInputAsync("input-name", z.string());
// throws if the input is not valid
```
