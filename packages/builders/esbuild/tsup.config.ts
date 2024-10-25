import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*.ts", "index.d.ts"],
	format: ["esm"],
	dts: true,
	splitting: true,
	clean: true,
	target: "es2022",
	bundle: true,
	outExtension(ctx) {
		return {
			js: ctx.format === "cjs" ? ".cjs" : ".mjs",
		};
	},
});