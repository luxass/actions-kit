/// <reference types="../esbuild.d.ts" />

import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { BuildOptions as ESBuildBuildOptions } from "esbuild";
import { getESBuildEntryPoint } from "./utils";
import { join } from "node:path";
import consola from "consola";
import { colors } from "consola/utils";

export interface BuilderOptions {
	/**
	 * The current working directory.
	 * @type {string}
	 */
	cwd: string;

	/**
	 * The configuration object for the ActionsKit project.
	 * @type {ActionsKitConfig}
	 */
	config: ActionsKitConfig;

	/**
	 * The output type for the action.
	 * @type {"esm" | "cjs"}
	 */
	libraryType: "esm" | "cjs";

	/**
	 * The name of the output file.
	 * @type {string}
	 */
	outputFileName: string;
}

/**
 * Builds the project using esbuild with the specified configuration.
 * @param {BuilderOptions} options - The build options.
 * @returns {Promise<void>} A promise that resolves when the build is complete.
 */
export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions): Promise<void> {
	const build = await import("esbuild").then((m) => m.build);
	const esbuildActionsKit = await import("unplugin-actions-kit/esbuild").then((m) => m.default);

	const defaultEntryPoint = join(cwd, "src/index.ts");
	const entryPoints = getESBuildEntryPoint(config.esbuild?.entryPoints, defaultEntryPoint);

	if (config.esbuild?.entryPoints) {
		config.esbuild.entryPoints = undefined;
	}

	const esbuildOptions = defu({
		...config.esbuild,
		// metafile should always be true
		metafile: true,
	}, {
		entryPoints: [entryPoints],
		platform: "node",
		target: "node20",
		format: libraryType,
		bundle: true,
		outfile: join(cwd, "dist", outputFileName),
		metafile: true,
		plugins: [
			esbuildActionsKit({
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
				autocomplete: config.autocomplete,
			}),
		],
	} satisfies ESBuildBuildOptions);

	const startTime = performance.now();

	const result = await build(
		// TODO: fix later
		esbuildOptions as ESBuildBuildOptions,
	);

	const buildTime = performance.now() - startTime;

	const metafile = result.metafile;

	if (!metafile) {
		throw new Error("metafile didn't generate")
	}

	const outputFiles = Object.entries(metafile.outputs);

	consola.success("Build completed successfully! 🎉");
	consola.info(`Build time: ${buildTime}ms`);

	consola.info("Build details:");
	for (const [outputFile, outputMeta] of outputFiles) {
		consola.info(`- ${outputFile}`);
		consola.info(`  - size: ${colors.yellow(`${(outputMeta.bytes / 1024).toFixed(2)} KB`)} (${colors.yellow(outputMeta.bytes)} bytes)`);
	}
}
