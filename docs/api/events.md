# Events

Available under `@actions-sdk/action-utils/events`.

This module contains utility functions for working with GitHub Actions events.

## Functions

### `isRelease`

Checks if the current event is a release event.

```ts
import { isRelease } from "@actions-sdk/action-utils/events";

if (isRelease()) {
  // do something
}
```

### `isPush`

Checks if the current event is a push event.

```ts
import { isPush } from "@actions-sdk/action-utils/events";

if (isPush()) {
  // do something
}
```

### `isPr`

Checks if the current event is a pull request event.

```ts
import { isPr } from "@actions-sdk/action-utils/events";

if (isPr()) {
  // do something
}
```

### `isIssue`

Checks if the current event is an issue event.

```ts
import { isIssue } from "@actions-sdk/action-utils/events";

if (isIssue()) {
  // do something
}
```

### `isCron`

Checks if the current event is a cron event.

```ts
import { isCron } from "@actions-sdk/action-utils/events";

if (isCron()) {
  // do something
}
```

### `isCustomEvent`

Checks if the current event is a custom event.

```ts
import { isCustomEvent } from "@actions-sdk/action-utils/events";

if (isCustomEvent()) {
  // do something
}
```

### `isWorkflowDispatch`

Checks if the current event is a workflow dispatch event.

```ts
import { isWorkflowDispatch } from "@actions-sdk/action-utils/events";

if (isWorkflowDispatch()) {
  // do something
}
```

### `isWorkflowRun`

Checks if the current event is a workflow run event.

```ts
import { isWorkflowRun } from "@actions-sdk/action-utils/events";

if (isWorkflowRun()) {
  // do something
}
```

### `isCreateTag`

Checks if the current event is a create tag event.

```ts
import { isCreateTag } from "@actions-sdk/action-utils/events";

if (isCreateTag()) {
  // do something
}
```

### `getPayload`

Returns the payload of the current event.

```ts
import { getPayload } from "@actions-sdk/action-utils/events";

const payload = getPayload();
```
