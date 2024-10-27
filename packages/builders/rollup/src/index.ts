import { rollup } from "rollup";
import { defineBuilder, type BuildOutput } from "actions-kit/builder";
import { inferModuleType, inferOutput } from "actions-kit/builder-utils";
import { defu } from "defu";
import { stat } from "node:fs/promises";
import { builtinModules } from "node:module";
import { join } from "node:path";
import type { RollupOptions } from "rollup";
import RollupActionsKit from "unplugin-actions-kit/rollup";

export default function rollupBuilder(options: RollupOptions = {}) {
	return defineBuilder({
		name: "rollup",
		build: async ({ cwd, config}) => {
			const { filename, dir } = await inferOutput(config);
			const libraryType = await inferModuleType(config, filename);

			const [commonjs, resolve, typescript] = await Promise.all([
				import("@rollup/plugin-commonjs").then((m) => m.default),
				import("@rollup/plugin-node-resolve").then((m) => m.default),
				import("@rollup/plugin-typescript").then((m) => m.default),
			]);

			const rollupOptions = defu(options, {
				input: config.build?.input || join(cwd, "src/index.ts"),
				external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
				output: {
					file: join(cwd, dir, filename),
					format: libraryType,
					exports: "auto",
				},
				plugins: [
					typescript({
						tsconfig: "./tsconfig.json",
						declaration: false,
					}),
					resolve({
						preferBuiltins: true,
					}),
					commonjs(),
					RollupActionsKit({
						// TODO: allow users to specify it.
						actionPath: join(cwd, "./action.yml"),
						inject: config.inject,
						autocomplete: config.autocomplete,
					}),
				],
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
			} satisfies RollupOptions);

			const builder = await rollup(rollupOptions);

			const result = await builder.write({
				format: libraryType,
				sourcemap: false,
				dir: dir,
				entryFileNames: filename,
			});

			const outputs: BuildOutput[] = [];
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
