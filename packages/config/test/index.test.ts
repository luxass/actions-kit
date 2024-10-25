import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type ActionsKitConfig, defineConfig, loadConfig } from "../src/index";

describe("defineConfig", () => {
  it("should return the provided configuration object", () => {
    const config: ActionsKitConfig = {
      writeYaml: true,
      action: {
        name: "Test Action",
        description: "A test action",
        inputs: {},
        outputs: {},
        runs: {
          using: "node12",
          main: "index.js"
        }
      },
      inject: "inputs",
      builder: "vite"
    };

    const result = defineConfig(config);
    expect(result).toEqual(config);
  });

  it("should handle optional fields correctly", () => {
    const config: ActionsKitConfig = {
      writeYaml: false,
      inject: true,
      builder: "rspack"
    };

    const result = defineConfig(config);
    expect(result).toEqual(config);
  });
});

import { ZodError } from 'zod';

// Mock the c12 loadConfig function
vi.mock('c12', () => ({
  loadConfig: vi.fn(),
}));

// Mock fs promises for file operations
vi.mock('fs/promises');

describe('loadConfig', () => {
  const mockCwd = '/mock/cwd';

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    // Mock process.cwd() if it's used as default
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should load default configuration correctly', async () => {
    const mockConfig = defineConfig({
      writeYaml: false,
      inject: true,
      builder: 'rspack',
    });

    // Mock the c12 loadConfig to return our test config
    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: mockConfig,
    });

    const config = await loadConfig();

    expect(mockC12LoadConfig).toHaveBeenCalledWith({
      cwd: mockCwd,
      dotenv: false,
      rcFile: false,
      globalRc: false,
      packageJson: false,
      configFile: 'actions-kit.config.ts',
    });

    expect(config).toEqual(mockConfig);
  });

  it('should load configuration from custom file path', async () => {
    const customConfigFile = 'custom.config.ts';
    const mockConfig = defineConfig({
      writeYaml: true,
      inject: 'inputs',
      builder: 'esbuild',
      action: {
        name: 'Test Action',
        description: 'Test Description',
        runs: {
          using: 'node20',
          main: 'dist/index.js',
        },
      },
    });

    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: mockConfig,
    });

    const config = await loadConfig(mockCwd, customConfigFile);

    expect(mockC12LoadConfig).toHaveBeenCalledWith({
      cwd: mockCwd,
      dotenv: false,
      rcFile: false,
      globalRc: false,
      packageJson: false,
      configFile: customConfigFile,
    });

    expect(config).toEqual(mockConfig);
  });

  it('should throw validation error for invalid configuration', async () => {
    const invalidConfig = {
      writeYaml: 'not-a-boolean', // Should be boolean
      inject: 'invalid-value', // Should be 'inputs', 'outputs', or true
      builder: 'invalid-builder', // Should be one of the allowed builders
    };

    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: invalidConfig,
    });

    await expect(loadConfig()).rejects.toThrow(ZodError);
  });

  it('should use default values when not provided', async () => {
    const minimalConfig = {};

    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: minimalConfig,
    });

    const config = await loadConfig();

    expect(config).toEqual({
      writeYaml: false,
      inject: true,
      builder: 'rspack',
    });
  });

  it('should handle empty config result from c12', async () => {
    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      // @ts-expect-error allowed for testing
      config: undefined,
    });

    const config = await loadConfig();

    expect(config).toEqual({
      writeYaml: false,
      inject: true,
      builder: 'rspack',
    });
  });

  it('should validate action schema when provided', async () => {
    const configWithAction = defineConfig({
      writeYaml: true,
      action: {
        name: 'Test Action',
        description: 'Test Description',
        runs: {
          using: 'node20',
          main: 'dist/index.js',
        },
      },
      builder: "rspack",
      inject: true,
    });

    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: configWithAction,
    });

    const config = await loadConfig();

    expect(config).toEqual(configWithAction);
  });

  it('should throw error for invalid action schema', async () => {
    const invalidActionConfig = defineConfig({
      writeYaml: true,
      action: {
        // Missing required fields
        name: 'Test Action',
      // biome-ignore lint/suspicious/noExplicitAny: this test checks if the schema validation works
      } as any,
    });

    const { loadConfig: mockC12LoadConfig } = await import('c12');
    vi.mocked(mockC12LoadConfig).mockResolvedValue({
      config: invalidActionConfig,
    });

    await expect(loadConfig()).rejects.toThrow(ZodError);
  });
});
