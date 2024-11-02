import { existsSync, readFileSync } from "node:fs";

/**
 * Checks if the current GitHub Actions event is a release event.
 *
 * @returns {boolean} `true` if the event is a release event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isRelease } from "@actions-sdk/action-utils/events";
 *
 * if (isRelease()) {
 *   console.log("This is a release event");
 * }
 * ```
 */
export function isRelease(): boolean {
	return process.env.GITHUB_EVENT_NAME === "release";
}

/**
 * Checks if the current GitHub Actions event is a push event.
 *
 * @returns {boolean} `true` if the event is a push event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isPush } from "@actions-sdk/action-utils/events";
 *
 * if (isPush()) {
 *   console.log("This is a push event");
 * }
 * ```
 */
export function isPush(): boolean {
	return process.env.GITHUB_EVENT_NAME === "push";
}

/**
 * Checks if the current GitHub Actions event is a pull request event.
 *
 * @returns {boolean} `true` if the event is a pull request event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isPr } from "@actions-sdk/action-utils/events";
 *
 * if (isPr()) {
 *   console.log("This is a pull request event");
 * }
 * ```
 */
export function isPr(): boolean {
	return (
		process.env.GITHUB_EVENT_NAME === "pull_request" ||
		process.env.GITHUB_EVENT_NAME === "pull_request_target"
	);
}

/**
 * Checks if the current GitHub Actions event is an issue event.
 *
 * @returns {boolean} `true` if the event is an issue event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isIssue } from "@actions-sdk/action-utils/events";
 *
 * if (isIssue()) {
 *   console.log("This is an issue event");
 * }
 * ```
 */
export function isIssue(): boolean {
	return process.env.GITHUB_EVENT_NAME === "issues";
}

/**
 * Checks if the current GitHub Actions event is a cron event.
 *
 * @returns {boolean} `true` if the event is a cron event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isCron } from "@actions-sdk/action-utils/events";
 *
 * if (isCron()) {
 *   console.log("This is a cron event");
 * }
 * ```
 */
export function isCron(): boolean {
	return process.env.GITHUB_EVENT_NAME === "schedule";
}

/**
 * Checks if the current GitHub Actions event is a custom event.
 *
 * @returns {boolean} `true` if the event is a custom event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isCustomEvent } from "@actions-sdk/action-utils/events";
 *
 * if (isCustomEvent()) {
 *   console.log("This is a custom event");
 * }
 * ```
 */
export function isCustomEvent(): boolean {
	return process.env.GITHUB_EVENT_NAME === "repository_dispatch";
}

/**
 * Checks if the current GitHub Actions event is a workflow dispatch event.
 *
 * @returns {boolean} `true` if the event is a workflow dispatch event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isWorkflowDispatch } from "@actions-sdk/action-utils/events";
 *
 * if (isWorkflowDispatch()) {
 *   console.log("This is a manual event");
 * }
 * ```
 */
export function isWorkflowDispatch(): boolean {
	return process.env.GITHUB_EVENT_NAME === "workflow_dispatch";
}

/**
 * Checks if the current GitHub Actions event is a workflow run event.
 *
 * @returns {boolean} `true` if the event is a workflow run event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isWorkflowRun } from "@actions-sdk/action-utils/events";
 *
 * if (isWorkflowRun()) {
 *   console.log("This is a workflow run event");
 * }
 * ```
 */
export function isWorkflowRun(): boolean {
	return process.env.GITHUB_EVENT_NAME === "workflow_run";
}

/**
 * Checks if the current GitHub Actions event is a create tag event.
 *
 * @returns {boolean} `true` if the event is a create tag event, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isCreateTag } from "@actions-sdk/action-utils/events";
 *
 * if (isCreateTag()) {
 *   console.log("This is a create tag event");
 * }
 * ```
 */
export function isCreateTag(): boolean {
	return process.env.GITHUB_EVENT_NAME === "create" && process.env.GITHUB_REF_TYPE === "tag";
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

/**
 * Retrieves the tag name of the current release event.
 *
 * @returns {string} The tag name of the release event.
 *
 * @example
 * ```ts
 * import { getTagName } from "@actions-sdk/action-utils/events";
 *
 * const tagName = getTagName();
 * console.log(`The tag name is: ${tagName}`);
 * ```
 */
export function getTagName(): string {
	if (isRelease()) {
		const payload = getPayload();
		if (payload == null) {
			throw new Error("No payload found for release event");
		}
		return payload.release.tag_name;
	}

	// biome-ignore lint/style/noNonNullAssertion: this is always set in github actions
	const ref = process.env.GITHUB_REF!;
	return /^refs\/tags\//.test(ref) ? ref.replace(/^refs\/tags\//, "") : "";
}

/**
 * Retrieves the sender's login from the payload if the sender is a user.
 *
 * @returns {string | null} The sender's login if the sender is a user, otherwise null.
 *
 * @example
 * ```ts
 * import { getSender } from "@actions-sdk/action-utils/events";
 *
 * const sender = getSender();
 * console.log(`The sender is: ${sender}`);
 * ```
 */
export function getSender(): string | null {
	const payload = getPayload();
	if (payload == null) {
		return null;
	}

	return payload.sender && payload.sender.type === "User" ? payload.sender.login : null;
}

/**
 * Retrieves the GitHub repository name from the environment variables.
 *
 * @returns {string} The name of the GitHub repository.
 *
 * @example
 * ```ts
 * import { getRepository } from "@actions-sdk/action-utils/events";
 *
 * const repository = getRepository();
 * console.log(`The repository is: ${repository}`);
 * ```
 */
export function getRepository(): string {
	// biome-ignore lint/style/noNonNullAssertion: should always be set in github actions
	return process.env.GITHUB_REPOSITORY!;
}
