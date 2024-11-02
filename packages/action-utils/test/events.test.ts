import { it, expect, describe, vi, beforeEach } from "vitest";
import {
	isCron,
	isCustomEvent,
	isIssue,
	isPr,
	isPush,
	isRelease,
	isWorkflowDispatch,
	isWorkflowRun,
} from "../src/events";

beforeEach(() => {
	vi.unstubAllEnvs();
});

describe("isRelease", () => {
	it("should return true if the event is a release event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "release");
		expect(isRelease()).toBe(true);
	});

	it("should return false if the event is not a release event", () => {
		expect(isRelease()).toBe(false);
	});
});

describe("isPush", () => {
	it("should return true if the event is a push event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "push");
		expect(isPush()).toBe(true);
	});

	it("should return false if the event is not a push event", () => {
		expect(isPush()).toBe(false);
	});
});

describe("isPr", () => {
	it("should return true if the event is a pull request event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "pull_request");
		expect(isPr()).toBe(true);
	});

	it("should return true if the event is a pull request target event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "pull_request_target");
		expect(isPr()).toBe(true);
	});

	it("should return false if the event is not a pull request event", () => {
		expect(isPr()).toBe(false);
	});
});

describe("isIssue", () => {
	it("should return true if the event is an issue event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "issues");
		expect(isIssue()).toBe(true);
	});

	it("should return false if the event is not an issue event", () => {
		expect(isIssue()).toBe(false);
	});
});

describe("isCron", () => {
	it("should return true if the event is a schedule event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "schedule");
		expect(isCron()).toBe(true);
	});

	it("should return false if the event is not a schedule event", () => {
		expect(isCron()).toBe(false);
	});
});

describe("isCustomEvent", () => {
	it("should return true if the event is a custom event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "custom");
		expect(isCustomEvent()).toBe(true);
	});

	it("should return false if the event is not a custom event", () => {
		expect(isCustomEvent()).toBe(false);
	});
});


describe("isWorkflowDispatch", () => {
  it("should return true if the event is a workflow dispatch event", () => {
    vi.stubEnv("GITHUB_EVENT_NAME", "workflow_dispatch");
    expect(isWorkflowDispatch()).toBe(true);
  });

  it("should return false if the event is not a workflow dispatch event", () => {
    expect(isWorkflowDispatch()).toBe(false);
  });
});


describe("isWorkflowRun", () => {
	it("should return true if the event is a workflow run event", () => {
		vi.stubEnv("GITHUB_EVENT_NAME", "workflow_run");
		expect(isWorkflowRun()).toBe(true);
	});

	it("should return false if the event is not a workflow run event", () => {
		expect(isWorkflowRun()).toBe(false);
	});
});
