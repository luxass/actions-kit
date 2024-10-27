import { defu } from "defu";
import type { InlineConfig } from "vite";
import { join, resolve } from "node:path";
import { defineBuilder, type BuildOutput } from "actions-kit/builder";
import { inferModuleType, inferOutput } from "actions-kit/builder-utils";
import { build } from "vite";
import ViteActionsKit from "unplugin-actions-kit/vite";
import { stat } from "node:fs/promises";

export default function viteBuilder(options: InlineConfig = {}) {
	return defineBuilder({
		name: "vite",
		build: async ({ cwd, config }) => {
			const { filename, dir } = await inferOutput(config);
			const libraryType = await inferModuleType(config, filename);

			const viteOptions = defu(options, {
				build: {
					minify: false,
					target: "node20",
					ssr: true,
					rollupOptions: {
						input: ["src/index.ts"],
						output: {
							entryFileNames: filename,
							format: libraryType,
							exports: "auto",
						},
						onwarn: (warning) => {
							if (
								warning.code === "UNRESOLVED_IMPORT" ||
								warning.code === "CIRCULAR_DEPENDENCY" ||
								warning.code === "EMPTY_BUNDLE"
							) {
								return;
							}

							// TODO: pretty print warnings
						},
					},
					outDir: dir,
				},
				ssr: {
					// Anything NOT 'node:' will be bundled.
					noExternal: /^(?!node:)/,
				},
				plugins: [
					ViteActionsKit({
						// TODO: allow users to specify it.
						actionPath: join(cwd, "./action.yml"),
						inject: config.inject,
						autocomplete: config.autocomplete,
					}),
				],
			} satisfies InlineConfig);

			const output = await build(viteOptions);
			const result = Array.isArray(output) ? output[0] : output;

			if (result != null && !("output" in result)) {
				throw new Error("Invalid output");
			}

			const outputs: BuildOutput[] = [];

			if (result?.output == null) {
				throw new Error("Invalid output");
			}

			for (const _result of result.output) {
				const stats = await stat(join(cwd, "dist", _result.fileName));
				outputs.push({
					name: _result.fileName,
					path: join(cwd, "dist", _result.fileName),
					size: stats.size,
				});
			}

			return outputs;
		},
	});
}
