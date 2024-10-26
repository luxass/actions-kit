import { stat } from "node:fs/promises";
import { builtinModules } from "node:module";
import { join } from "node:path";
import { type BuildOutput, defineBuilder } from "actions-kit/builder";
import { inferModuleType, inferOutputFilename } from "actions-kit/builder-utils";
import { defu } from "defu";
import type { RolldownOptions } from "rolldown";
import { rolldown } from "rolldown";
import RolldownActionsKit from "unplugin-actions-kit/rolldown";

export default function rolldownBuilder(options: RolldownOptions = {}) {
	return defineBuilder({
		name: "rolldown",
		build: async ({ cwd, config }) => {
			const outputFileName = await inferOutputFilename(config);
			const libraryType = await inferModuleType(config, outputFileName);
			const rolldownOptions = defu(options, {
				input: config.build?.input || join(cwd, "src/index.ts"),
				external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
				resolve: {
					conditionNames: ["import"],
				},
				platform: "node",
				plugins: [
					RolldownActionsKit({
						actionPath: join(cwd, "./action.yml"),
						inject: config.inject,
						autocomplete: config.autocomplete,
					}),
				],
				output: {
					name: outputFileName,
					format: libraryType,
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
			} satisfies RolldownOptions);

			const builder = await rolldown(rolldownOptions);

			const output = await builder.write({
				format: libraryType,
				sourcemap: false,
				dir: join(cwd, "dist"),
				entryFileNames: outputFileName,
			});

			if (Array.isArray(output) && output.length > 1) {
				console.warn("Multiple outputs detected. Only the first output will be displayed.");
			}

			const result = Array.isArray(output) ? output[0] : output;

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
