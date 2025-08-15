# Events

Available under `@actions-sdk/action-utils/events`.

This module contains utility functions for working with GitHub Actions events.

## Functions

### `isBranchProtectionRule`

Checks if the current event is a branch protection rule event.

```ts
import { isBranchProtectionRule } from "@actions-sdk/action-utils/events";

if (isBranchProtectionRule()) {
  // do something
}
```

### `isCheckRun`

Checks if the current event is a check run event.

```ts
import { isCheckRun } from "@actions-sdk/action-utils/events";

if (isCheckRun()) {
  // do something
}
```

### `isCheckSuite`

Checks if the current event is a check suite event.

```ts
import { isCheckSuite } from "@actions-sdk/action-utils/events";

if (isCheckSuite()) {
  // do something
}
```

### `isCreate`

Checks if the current event is a create event.

```ts
import { isCreate } from "@actions-sdk/action-utils/events";

if (isCreate()) {
  // do something
}
```

### `isDelete`

Checks if the current event is a delete event.

```ts
import { isDelete } from "@actions-sdk/action-utils/events";

if (isDelete()) {
  // do something
}
```

### `isDeployment`

Checks if the current event is a deployment event.

```ts
import { isDeployment } from "@actions-sdk/action-utils/events";

if (isDeployment()) {
  // do something
}
```

### `isDeploymentStatus`

Checks if the current event is a deployment status event.

```ts
import { isDeploymentStatus } from "@actions-sdk/action-utils/events";

if (isDeploymentStatus()) {
  // do something
}
```

### `isDiscussion`

Checks if the current event is a discussion event.

```ts
import { isDiscussion } from "@actions-sdk/action-utils/events";

if (isDiscussion()) {
  // do something
}
```

### `isDiscussionComment`

Checks if the current event is a discussion comment event.

```ts
import { isDiscussionComment } from "@actions-sdk/action-utils/events";

if (isDiscussionComment()) {
  // do something
}
```

### `isFork`

Checks if the current event is a fork event.

```ts
import { isFork } from "@actions-sdk/action-utils/events";

if (isFork()) {
  // do something
}
```

### `isGollum`

Checks if the current event is a gollum event.

```ts
import { isGollum } from "@actions-sdk/action-utils/events";

if (isGollum()) {
  // do something
}
```

### `isIssueComment`

Checks if the current event is a issue comment event.

```ts
import { isIssueComment } from "@actions-sdk/action-utils/events";

if (isIssueComment()) {
  // do something
}
```

### `isIssues`

Checks if the current event is a issues event.

```ts
import { isIssues } from "@actions-sdk/action-utils/events";

if (isIssues()) {
  // do something
}
```

### `isLabel`

Checks if the current event is a label event.

```ts
import { isLabel } from "@actions-sdk/action-utils/events";

if (isLabel()) {
  // do something
}
```

### `isMergeGroup`

Checks if the current event is a merge group event.

```ts
import { isMergeGroup } from "@actions-sdk/action-utils/events";

if (isMergeGroup()) {
  // do something
}
```

### `isMilestone`

Checks if the current event is a milestone event.

```ts
import { isMilestone } from "@actions-sdk/action-utils/events";

if (isMilestone()) {
  // do something
}
```

### `isPageBuild`

Checks if the current event is a page build event.

```ts
import { isPageBuild } from "@actions-sdk/action-utils/events";

if (isPageBuild()) {
  // do something
}
```

### `isProject`

Checks if the current event is a project event.

```ts
import { isProject } from "@actions-sdk/action-utils/events";

if (isProject()) {
  // do something
}
```

### `isProjectCard`

Checks if the current event is a project card event.

```ts
import { isProjectCard } from "@actions-sdk/action-utils/events";

if (isProjectCard()) {
  // do something
}
```

### `isProjectColumn`

Checks if the current event is a project column event.

```ts
import { isProjectColumn } from "@actions-sdk/action-utils/events";

if (isProjectColumn()) {
  // do something
}
```

### `isPublic`

Checks if the current event is a public event.

```ts
import { isPublic } from "@actions-sdk/action-utils/events";

if (isPublic()) {
  // do something
}
```

### `isPullRequest`

Checks if the current event is a pull request event.

```ts
import { isPullRequest } from "@actions-sdk/action-utils/events";

if (isPullRequest()) {
  // do something
}
```

### `isPullRequestReview`

Checks if the current event is a pull request review event.

```ts
import { isPullRequestReview } from "@actions-sdk/action-utils/events";

if (isPullRequestReview()) {
  // do something
}
```

### `isPullRequestReviewComment`

Checks if the current event is a pull request review comment event.

```ts
import { isPullRequestReviewComment } from "@actions-sdk/action-utils/events";

if (isPullRequestReviewComment()) {
  // do something
}
```

### `isPullRequestTarget`

Checks if the current event is a pull request target event.

```ts
import { isPullRequestTarget } from "@actions-sdk/action-utils/events";

if (isPullRequestTarget()) {
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

### `isRegistryPackage`

Checks if the current event is a registry package event.

```ts
import { isRegistryPackage } from "@actions-sdk/action-utils/events";

if (isRegistryPackage()) {
  // do something
}
```

### `isRelease`

Checks if the current event is a release event.

```ts
import { isRelease } from "@actions-sdk/action-utils/events";

if (isRelease()) {
  // do something
}
```

### `isStatus`

Checks if the current event is a status event.

```ts
import { isStatus } from "@actions-sdk/action-utils/events";

if (isStatus()) {
  // do something
}
```

### `isWatch`

Checks if the current event is a watch event.

```ts
import { isWatch } from "@actions-sdk/action-utils/events";

if (isWatch()) {
  // do something
}
```

### `isWorkflowCall`

Checks if the current event is a workflow call event.

```ts
import { isWorkflowCall } from "@actions-sdk/action-utils/events";

if (isWorkflowCall()) {
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

### `isRepositoryDispatch`

Checks if the current event is a repository dispatch event.

```ts
import { isRepositoryDispatch } from "@actions-sdk/action-utils/events";

if (isRepositoryDispatch()) {
  // do something
}
```

### `isSchedule`

Checks if the current event is a schedule event.

```ts
import { isSchedule } from "@actions-sdk/action-utils/events";

if (isSchedule()) {
  // do something
}
```

### `getPayload`

Returns the payload of the current event.

```ts
import { getPayload } from "@actions-sdk/action-utils/events";

const payload = getPayload();
// null if payload is not available
```
