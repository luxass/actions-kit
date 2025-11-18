import { createTsdownConfig } from "@actions-kit/tsdown-config";

export default createTsdownConfig([
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    outDir: "dist/cli",
    publint: true,
    exports: true,
  },
  {
    entry: {
      "index": "src/index.ts",
      "config": "src/config.ts",
      "utils": "src/utils.ts",
      "builder": "src/builder/index.ts",
      "builder-utils": "src/builder/utils.ts",
    },
    format: ["esm", "cjs"],
    clean: ["!**/cli"],
    publint: true,
    exports: true,
  },
]);
