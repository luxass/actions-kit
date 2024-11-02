import { existsSync, readFileSync } from "node:fs";

export function isRelease(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'release';
}

export function isPush(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'push';
}

export function isPr(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'pull_request' || process.env.GITHUB_EVENT_NAME === 'pull_request_target';
}

export function isIssue(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'issues';
}

export function isCron(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'schedule';
}

export function isCustomEvent(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'repository_dispatch';
}

export function isManualEvent(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
}

export function isWorkflowRun(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'workflow_run';
}

export function isCreateTag(): boolean {
  return process.env.GITHUB_EVENT_NAME === 'create' && process.env.GITHUB_REF_TYPE === 'tag';
}

// biome-ignore lint/suspicious/noExplicitAny: fix later
export function getPayload(): Record<string, any> | null {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath == null) {
    return null;
  }

  if (!existsSync(eventPath)) {
    return null;
  }

  return JSON.parse(readFileSync(eventPath, { encoding: 'utf8' }));
}

export function getTagName(): string {
  if (isRelease()) {
    const payload = getPayload();
    if (payload == null) {
      throw new Error('No payload found for release event');
    }
    return payload.release.tag_name
  }

  // biome-ignore lint/style/noNonNullAssertion: this is always set in github actions
  const ref = process.env.GITHUB_REF!;
  return (/^refs\/tags\//.test(ref) ? ref.replace(/^refs\/tags\//, '') : '');
}

export function getSender(): string | null {
  const payload = getPayload();
  if (payload == null) {
    return null;
  }

  return payload.sender && payload.sender.type === "User" ? payload.sender.login : null;
}

export function getRepository(): string {
  // biome-ignore lint/style/noNonNullAssertion: should always be set in github actions
  return process.env.GITHUB_REPOSITORY!;
}
