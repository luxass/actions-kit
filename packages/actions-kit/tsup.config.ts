import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/index.ts", "src/config.ts", "src/builder/*.ts"],
		format: ["esm", "cjs"],
		dts: true,
		splitting: true,
		clean: false,
		target: "es2022",
		bundle: true,
		outExtension(ctx) {
			return {
				js: ctx.format === "cjs" ? ".cjs" : ".mjs",
			};
		},
	},
	{
		entry: ["src/cli.ts"],
		format: ["esm"],
		dts: true,
		splitting: true,
		clean: false,
		target: "es2022",
		bundle: true,
		outExtension(ctx) {
			return {
				js: ctx.format === "cjs" ? ".cjs" : ".mjs",
			};
		},
	},
]);
