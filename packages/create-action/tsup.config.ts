import { defineConfig } from "tsup";
import { cp, rm } from "node:fs/promises";
export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	clean: true,
	target: "es2022",
	bundle: true,
	splitting: false,
	outExtension(ctx) {
		return {
			js: ctx.format === "cjs" ? ".cjs" : ".mjs",
		};
	},

	async onSuccess() {
		await rm("dist/templates", {
			recursive: true,
		});

		await cp("templates", "dist/templates", {
			recursive: true,
		});
	}
});
