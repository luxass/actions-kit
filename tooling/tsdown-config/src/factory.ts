import type { Options as TSDownOptions } from "tsdown";
import { defineConfig } from "tsdown";

export const baseConfig = {
  exports: true,
  format: ["esm", "cjs"],
  clean: true,
  dts: true,
  treeshake: true,
  publint: true,
  tsconfig: "./tsconfig.build.json",
  inputOptions: {
    onwarn: (warning, defaultHandler) => {
      if (warning.code === "UNRESOLVED_IMPORT") {
        throw new Error(
          `Unresolved import: ${warning.message}. Please ensure all dependencies are installed and paths are correct.`,
        );
      }

      return defaultHandler(warning);
    },
  },
} satisfies TSDownOptions;

export function createTsdownConfig(
  overrides: Partial<TSDownOptions> | Partial<TSDownOptions>[] = {},
) {
  if (Array.isArray(overrides)) {
    return defineConfig(
      overrides.map((override) => ({
        ...baseConfig,
        ...override,
        entry: override.entry || ["./src/index.ts"],
      })),
    );
  }

  return defineConfig({
    ...baseConfig,
    ...overrides,
    entry: overrides.entry || ["./src/index.ts"],
  });
}
