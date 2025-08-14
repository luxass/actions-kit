import * as fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPayload,
  isBranchProtectionRule,
  isCheckRun,
  isCheckSuite,
  isCreate,
  isDelete,
  isDeployment,
  isDeploymentStatus,
  isDiscussion,
  isDiscussionComment,
  isFork,
  isGollum,
  isIssueComment,
  isIssues,
  isLabel,
  isMergeGroup,
  isMilestone,
  isPageBuild,
  isProject,
  isProjectCard,
  isProjectColumn,
  isPublic,
  isPullRequest,
  isPullRequestReview,
  isPullRequestReviewComment,
  isPullRequestTarget,
  isPush,
  isRegistryPackage,
  isRelease,
  isRepositoryDispatch,
  isSchedule,
  isStatus,
  isWatch,
  isWorkflowCall,
  isWorkflowDispatch,
  isWorkflowRun,
} from "../src/events";

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("gitHub Event Type Checks", () => {
  const eventChecks = [
    { name: "branch_protection_rule", fn: isBranchProtectionRule },
    { name: "check_run", fn: isCheckRun },
    { name: "check_suite", fn: isCheckSuite },
    { name: "create", fn: isCreate },
    { name: "delete", fn: isDelete },
    { name: "deployment", fn: isDeployment },
    { name: "deployment_status", fn: isDeploymentStatus },
    { name: "discussion", fn: isDiscussion },
    { name: "discussion_comment", fn: isDiscussionComment },
    { name: "fork", fn: isFork },
    { name: "gollum", fn: isGollum },
    { name: "issue_comment", fn: isIssueComment },
    { name: "issues", fn: isIssues },
    { name: "label", fn: isLabel },
    { name: "merge_group", fn: isMergeGroup },
    { name: "milestone", fn: isMilestone },
    { name: "page_build", fn: isPageBuild },
    { name: "project", fn: isProject },
    { name: "project_card", fn: isProjectCard },
    { name: "project_column", fn: isProjectColumn },
    { name: "public", fn: isPublic },
    { name: "pull_request", fn: isPullRequest },
    { name: "pull_request_review", fn: isPullRequestReview },
    { name: "pull_request_review_comment", fn: isPullRequestReviewComment },
    { name: "push", fn: isPush },
    { name: "pull_request_target", fn: isPullRequestTarget },
    { name: "registry_package", fn: isRegistryPackage },
    { name: "release", fn: isRelease },
    { name: "repository_dispatch", fn: isRepositoryDispatch },
    { name: "schedule", fn: isSchedule },
    { name: "status", fn: isStatus },
    { name: "watch", fn: isWatch },
    { name: "workflow_dispatch", fn: isWorkflowDispatch },
    { name: "workflow_run", fn: isWorkflowRun },
    { name: "workflow_call", fn: isWorkflowCall },
  ] as const;

  it.each(eventChecks)("$name event check", ({ name, fn }) => {
    vi.stubEnv("GITHUB_EVENT_NAME", name);
    expect(fn()).toBe(true);

    vi.stubEnv("GITHUB_EVENT_NAME", "different_event");
    expect(fn()).toBe(false);

    vi.stubEnv("GITHUB_EVENT_NAME", undefined);
    expect(fn()).toBe(false);
  });
});

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

describe("getPayload", () => {
  it("should return null when GITHUB_EVENT_PATH is not set", () => {
    vi.stubEnv("GITHUB_EVENT_PATH", undefined);
    const result = getPayload();
    expect(result).toBeNull();
  });

  it("should return null when event path file does not exist", () => {
    vi.stubEnv("GITHUB_EVENT_PATH", "/path/to/nonexistent/file");
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = getPayload();

    expect(result).toBeNull();
    expect(fs.existsSync).toHaveBeenCalledWith("/path/to/nonexistent/file");
  });

  it("should return parsed JSON when file exists and is valid", () => {
    const mockPath = "/path/to/event.json";
    const mockData = { event: "push", ref: "main" };
    vi.stubEnv("GITHUB_EVENT_PATH", mockPath);
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockData));

    const result = getPayload();

    expect(result).toEqual(mockData);
    expect(fs.existsSync).toHaveBeenCalledWith(mockPath);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockPath, { encoding: "utf8" });
  });

  it("should throw error when JSON is invalid", () => {
    const mockPath = "/path/to/event.json";

    vi.stubEnv("GITHUB_EVENT_PATH", mockPath);
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("invalid json");

    expect(() => getPayload()).toThrow(SyntaxError);
  });
});
