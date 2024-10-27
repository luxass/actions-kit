import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/cli.ts"],
		format: ["esm"],
		splitting: true,
		clean: true,
		target: "es2022",
		bundle: true,
		outExtension(ctx) {
			return {
				js: ctx.format === "cjs" ? ".cjs" : ".mjs",
			};
		},
		outDir: "dist/cli",
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
		dts: true,
		splitting: true,
		clean: ["!**/cli.mjs"],
		target: "es2022",
		bundle: true,
		outExtension(ctx) {
			return {
				js: ctx.format === "cjs" ? ".cjs" : ".mjs",
			};
		},
	},
]);
