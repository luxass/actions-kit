import { createTsdownConfig } from "@actions-kit/tsdown-config";

export default createTsdownConfig([
	{
		entry: ["src/cli.ts"],
		format: ["esm"],
		outDir: "dist/cli",
    publint: true,
    exports: true
	},
	{
		entry: [
			"src/index.ts",
			"src/config.ts",
			"src/utils.ts",
			"src/builder/index.ts",
			"src/builder/utils.ts",
		],
		format: ["esm", "cjs"],
		clean: ["!**/cli"],
    publint: true,
    exports: true
	},
]);
