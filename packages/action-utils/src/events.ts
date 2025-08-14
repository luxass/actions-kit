import { existsSync, readFileSync } from "node:fs";

/**
 * Checks if the current GitHub event is a `branch_protection_rule` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#branch_protection_rule GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "branch_protection_rule", false otherwise.
 *
 * @example
 * ```typescript
 * if (isBranchProtectionRule()) {
 *   console.log('Processing branch_protection_rule event');
 * }
 * ```
 */
export function isBranchProtectionRule(): boolean {
  return process.env.GITHUB_EVENT_NAME === "branch_protection_rule";
}

/**
 * Checks if the current GitHub event is a `check_run` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#check_run GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "check_run", false otherwise.
 *
 * @example
 * ```typescript
 * if (isCheckRun()) {
 *   console.log('Processing check_run event');
 * }
 * ```
 */
export function isCheckRun(): boolean {
  return process.env.GITHUB_EVENT_NAME === "check_run";
}

/**
 * Checks if the current GitHub event is a `check_suite` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#check_suite GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "check_suite", false otherwise.
 *
 * @example
 * ```typescript
 * if (isCheckSuite()) {
 *   console.log('Processing check_suite event');
 * }
 * ```
 */
export function isCheckSuite(): boolean {
  return process.env.GITHUB_EVENT_NAME === "check_suite";
}

/**
 * Checks if the current GitHub event is a `create` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#create GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "create", false otherwise.
 *
 * @example
 * ```typescript
 * if (isCreate()) {
 *   console.log('Processing create event');
 * }
 * ```
 */
export function isCreate(): boolean {
  return process.env.GITHUB_EVENT_NAME === "create";
}

/**
 * Checks if the current GitHub event is a `delete` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#delete GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "delete", false otherwise.
 *
 * @example
 * ```typescript
 * if (isDelete()) {
 *   console.log('Processing delete event');
 * }
 * ```
 */
export function isDelete(): boolean {
  return process.env.GITHUB_EVENT_NAME === "delete";
}

/**
 * Checks if the current GitHub event is a `deployment` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#deployment GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "deployment", false otherwise.
 *
 * @example
 * ```typescript
 * if (isDeployment()) {
 *   console.log('Processing deployment event');
 * }
 * ```
 */
export function isDeployment(): boolean {
  return process.env.GITHUB_EVENT_NAME === "deployment";
}

/**
 * Checks if the current GitHub event is a `deployment_status` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#deployment_status GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "deployment_status", false otherwise.
 *
 * @example
 * ```typescript
 * if (isDeploymentStatus()) {
 *   console.log('Processing deployment_status event');
 * }
 * ```
 */
export function isDeploymentStatus(): boolean {
  return process.env.GITHUB_EVENT_NAME === "deployment_status";
}

/**
 * Checks if the current GitHub event is a `discussion` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#discussion GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "discussion", false otherwise.
 *
 * @example
 * ```typescript
 * if (isDiscussion()) {
 *   console.log('Processing discussion event');
 * }
 * ```
 */
export function isDiscussion(): boolean {
  return process.env.GITHUB_EVENT_NAME === "discussion";
}

/**
 * Checks if the current GitHub event is a `discussion_comment` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#discussion_comment GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "discussion_comment", false otherwise.
 *
 * @example
 * ```typescript
 * if (isDiscussionComment()) {
 *   console.log('Processing discussion_comment event');
 * }
 * ```
 */
export function isDiscussionComment(): boolean {
  return process.env.GITHUB_EVENT_NAME === "discussion_comment";
}

/**
 * Checks if the current GitHub event is a `fork` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#fork GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "fork", false otherwise.
 *
 * @example
 * ```typescript
 * if (isFork()) {
 *   console.log('Processing fork event');
 * }
 * ```
 */
export function isFork(): boolean {
  return process.env.GITHUB_EVENT_NAME === "fork";
}

/**
 * Checks if the current GitHub event is a `gollum` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#gollum GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "gollum", false otherwise.
 *
 * @example
 * ```typescript
 * if (isGollum()) {
 *   console.log('Processing gollum event');
 * }
 * ```
 */
export function isGollum(): boolean {
  return process.env.GITHUB_EVENT_NAME === "gollum";
}

/**
 * Checks if the current GitHub event is a `issue_comment` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#issue_comment GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "issue_comment", false otherwise.
 *
 * @example
 * ```typescript
 * if (isIssueComment()) {
 *   console.log('Processing issue_comment event');
 * }
 * ```
 */
export function isIssueComment(): boolean {
  return process.env.GITHUB_EVENT_NAME === "issue_comment";
}

/**
 * Checks if the current GitHub event is a `issues` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#issues GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "issues", false otherwise.
 *
 * @example
 * ```typescript
 * if (isIssues()) {
 *   console.log('Processing issues event');
 * }
 * ```
 */
export function isIssues(): boolean {
  return process.env.GITHUB_EVENT_NAME === "issues";
}

/**
 * Checks if the current GitHub event is a `label` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#label GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "label", false otherwise.
 *
 * @example
 * ```typescript
 * if (isLabel()) {
 *   console.log('Processing label event');
 * }
 * ```
 */
export function isLabel(): boolean {
  return process.env.GITHUB_EVENT_NAME === "label";
}

/**
 * Checks if the current GitHub event is a `merge_group` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#merge_group GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "merge_group", false otherwise.
 *
 * @example
 * ```typescript
 * if (isMergeGroup()) {
 *   console.log('Processing merge_group event');
 * }
 * ```
 */
export function isMergeGroup(): boolean {
  return process.env.GITHUB_EVENT_NAME === "merge_group";
}

/**
 * Checks if the current GitHub event is a `milestone` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#milestone GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "milestone", false otherwise.
 *
 * @example
 * ```typescript
 * if (isMilestone()) {
 *   console.log('Processing milestone event');
 * }
 * ```
 */
export function isMilestone(): boolean {
  return process.env.GITHUB_EVENT_NAME === "milestone";
}

/**
 * Checks if the current GitHub event is a `page_build` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#page_build GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "page_build", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPageBuild()) {
 *   console.log('Processing page_build event');
 * }
 * ```
 */
export function isPageBuild(): boolean {
  return process.env.GITHUB_EVENT_NAME === "page_build";
}

/**
 * Checks if the current GitHub event is a `project` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#project GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "project", false otherwise.
 *
 * @example
 * ```typescript
 * if (isProject()) {
 *   console.log('Processing project event');
 * }
 * ```
 */
export function isProject(): boolean {
  return process.env.GITHUB_EVENT_NAME === "project";
}

/**
 * Checks if the current GitHub event is a `project_card` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#project_card GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "project_card", false otherwise.
 *
 * @example
 * ```typescript
 * if (isProjectCard()) {
 *   console.log('Processing project_card event');
 * }
 * ```
 */
export function isProjectCard(): boolean {
  return process.env.GITHUB_EVENT_NAME === "project_card";
}

/**
 * Checks if the current GitHub event is a `project_column` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#project_column GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "project_column", false otherwise.
 *
 * @example
 * ```typescript
 * if (isProjectColumn()) {
 *   console.log('Processing project_column event');
 * }
 * ```
 */
export function isProjectColumn(): boolean {
  return process.env.GITHUB_EVENT_NAME === "project_column";
}

/**
 * Checks if the current GitHub event is a `public` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#public GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "public", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPublic()) {
 *   console.log('Processing public event');
 * }
 * ```
 */
export function isPublic(): boolean {
  return process.env.GITHUB_EVENT_NAME === "public";
}

/**
 * Checks if the current GitHub event is a `pull_request` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "pull_request", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPullRequest()) {
 *   console.log('Processing pull_request event');
 * }
 * ```
 */
export function isPullRequest(): boolean {
  return process.env.GITHUB_EVENT_NAME === "pull_request";
}

/**
 * Checks if the current GitHub event is a `pull_request_review` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_review GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "pull_request_review", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPullRequestReview()) {
 *   console.log('Processing pull_request_review event');
 * }
 * ```
 */
export function isPullRequestReview(): boolean {
  return process.env.GITHUB_EVENT_NAME === "pull_request_review";
}

/**
 * Checks if the current GitHub event is a `pull_request_review_comment` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_review_comment GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "pull_request_review_comment", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPullRequestReviewComment()) {
 *   console.log('Processing pull_request_review_comment event');
 * }
 * ```
 */
export function isPullRequestReviewComment(): boolean {
  return process.env.GITHUB_EVENT_NAME === "pull_request_review_comment";
}

/**
 * Checks if the current GitHub event is a `pull_request_target` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "pull_request_target", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPullRequestTarget()) {
 *   console.log('Processing pull_request_target event');
 * }
 * ```
 */
export function isPullRequestTarget(): boolean {
  return process.env.GITHUB_EVENT_NAME === "pull_request_target";
}

/**
 * Checks if the current GitHub event is a `push` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#push GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "push", false otherwise.
 *
 * @example
 * ```typescript
 * if (isPush()) {
 *   console.log('Processing push event');
 * }
 * ```
 */
export function isPush(): boolean {
  return process.env.GITHUB_EVENT_NAME === "push";
}

/**
 * Checks if the current GitHub event is a `registry_package` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#registry_package GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "registry_package", false otherwise.
 *
 * @example
 * ```typescript
 * if (isRegistryPackage()) {
 *   console.log('Processing registry_package event');
 * }
 * ```
 */
export function isRegistryPackage(): boolean {
  return process.env.GITHUB_EVENT_NAME === "registry_package";
}

/**
 * Checks if the current GitHub event is a `release` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "release", false otherwise.
 *
 * @example
 * ```typescript
 * if (isRelease()) {
 *   console.log('Processing release event');
 * }
 * ```
 */
export function isRelease(): boolean {
  return process.env.GITHUB_EVENT_NAME === "release";
}

/**
 * Checks if the current GitHub event is a `status` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#status GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "status", false otherwise.
 *
 * @example
 * ```typescript
 * if (isStatus()) {
 *   console.log('Processing status event');
 * }
 * ```
 */
export function isStatus(): boolean {
  return process.env.GITHUB_EVENT_NAME === "status";
}

/**
 * Checks if the current GitHub event is a `watch` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#watch GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "watch", false otherwise.
 *
 * @example
 * ```typescript
 * if (isWatch()) {
 *   console.log('Processing watch event');
 * }
 * ```
 */
export function isWatch(): boolean {
  return process.env.GITHUB_EVENT_NAME === "watch";
}

/**
 * Checks if the current GitHub event is a `workflow_call` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_call GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "workflow_call", false otherwise.
 *
 * @example
 * ```typescript
 * if (isWorkflowCall()) {
 *   console.log('Processing workflow_call event');
 * }
 * ```
 */
export function isWorkflowCall(): boolean {
  return process.env.GITHUB_EVENT_NAME === "workflow_call";
}

/**
 * Checks if the current GitHub event is a `workflow_dispatch` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "workflow_dispatch", false otherwise.
 *
 * @example
 * ```typescript
 * if (isWorkflowDispatch()) {
 *   console.log('Processing workflow_dispatch event');
 * }
 * ```
 */
export function isWorkflowDispatch(): boolean {
  return process.env.GITHUB_EVENT_NAME === "workflow_dispatch";
}

/**
 * Checks if the current GitHub event is a `workflow_run` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "workflow_run", false otherwise.
 *
 * @example
 * ```typescript
 * if (isWorkflowRun()) {
 *   console.log('Processing workflow_run event');
 * }
 * ```
 */
export function isWorkflowRun(): boolean {
  return process.env.GITHUB_EVENT_NAME === "workflow_run";
}

/**
 * Checks if the current GitHub event is a `repository_dispatch` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#repository_dispatch GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "repository_dispatch", false otherwise.
 *
 * @example
 * ```typescript
 * if (isRepositoryDispatch()) {
 *   console.log('Processing repository_dispatch event');
 * }
 * ```
 */
export function isRepositoryDispatch(): boolean {
  return process.env.GITHUB_EVENT_NAME === "repository_dispatch";
}

/**
 * Checks if the current GitHub event is a `schedule` event.
 *
 * @see {@link https://docs.github.com/en/actions/reference/events-that-trigger-workflows#schedule GitHub Docs}
 *
 * @returns {boolean} Returns true if the current event is "schedule", false otherwise.
 *
 * @example
 * ```typescript
 * if (isSchedule()) {
 *   console.log('Processing schedule event');
 * }
 * ```
 */
export function isSchedule(): boolean {
  return process.env.GITHUB_EVENT_NAME === "schedule";
}

/**
 * Retrieves the GitHub event payload from the file specified by the `GITHUB_EVENT_PATH` environment variable.
 *
 * @returns {Record<string, any> | null} The parsed event payload as an object, or `null` if the event path is not set or the file does not exist.
 *
 * @example
 * ```ts
 * import { getPayload } from "@actions-sdk/action-utils/events";
 *
 * const payload = getPayload();
 * console.log(payload);
 * ```
 */
// biome-ignore lint/suspicious/noExplicitAny: fix later
export function getPayload(): Record<string, any> | null {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath == null) {
    return null;
  }

  if (!existsSync(eventPath)) {
    return null;
  }

  return JSON.parse(readFileSync(eventPath, { encoding: "utf8" }));
}
