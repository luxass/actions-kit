import { defineBuilder, type BuildOutput } from "actions-kit/builder";
import { inferModuleType, inferOutput } from "actions-kit/builder-utils";
import { defu } from "defu";
import type { BuildOptions as ESBuildBuildOptions } from "esbuild";
import { build } from "esbuild";
import { dirname, join } from "node:path";
import ESBuildActionsKit from "unplugin-actions-kit/esbuild";
import { getESBuildEntryPoint } from "./utils";

export default function esbuildBuilder(options: ESBuildBuildOptions = {}) {
	return defineBuilder({
		name: "esbuild",
		build: async ({ cwd, config }) => {
			const defaultEntryPoint = config.build?.input || join(cwd, "src/index.ts");
			const entryPoints = getESBuildEntryPoint(options.entryPoints, defaultEntryPoint);

			if (options.entryPoints) {
				options.entryPoints = undefined;
			}

			const { filename, dir } = await inferOutput(config);
			const libraryType = await inferModuleType(config, filename);

			const esbuildOptions = defu(
				{
					...options,
					// metafile should always be true
					metafile: true,
				},
				{
					entryPoints: [entryPoints],
					platform: "node",
					target: "node20",
					format: libraryType,
					bundle: true,
					outfile: join(dir, filename),
					metafile: true,
					plugins: [
						ESBuildActionsKit({
							actionPath: join(cwd, "./action.yml"),
							inject: config.inject,
							autocomplete: config.autocomplete,
						}),
					],
				} satisfies ESBuildBuildOptions,
			);

			const result = await build(
				// TODO: fix later
				esbuildOptions as ESBuildBuildOptions,
			);

			const metafile = result.metafile;

			if (!metafile) {
				throw new Error("metafile didn't generate");
			}

			const outputFiles = Object.entries(metafile.outputs);

			const output: BuildOutput[] = [];
			for (const [outputFile, outputMeta] of outputFiles) {
				// remove dir from filename
				const fileName = outputFile.replace(`${dirname(outputFile)}/`, "");
				output.push({
					name: fileName,
					path: join(dir, fileName),
					size: outputMeta.bytes,
				});
			}

			return output;
		},
	});
}
