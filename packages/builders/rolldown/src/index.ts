/// <reference types="../rolldown.d.ts" />

import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { RolldownOptions } from "rolldown";
import { join } from "node:path";
import consola from "consola";
import { builtinModules } from "node:module";
import { stat } from "node:fs/promises";
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
export async function build({
	cwd,
	config,
	libraryType,
	outputFileName,
}: BuilderOptions): Promise<void> {
	const build = await import("rolldown").then((m) => m.rolldown);
	const rolldownActionsKit = await import("unplugin-actions-kit/rolldown").then((m) => m.default);

	const rolldownOptions = defu(config.rolldown, {
		input: config.build?.input || join(cwd, "src/index.ts"),
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
		resolve: {
			conditionNames: ["import"],
		},
		platform: "node",
		plugins: [
			rolldownActionsKit({
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

	const startTime = performance.now();

	const builder = await build(rolldownOptions);

	const output = await builder.write({
		format: libraryType,
		sourcemap: false,
		dir: join(cwd, "dist"),
		entryFileNames: outputFileName,
	});

	const buildTime = performance.now() - startTime;

	if (Array.isArray(output) && output.length > 1) {
		consola.warn("Multiple outputs detected. Only the first output will be displayed.");
	}

	const result = Array.isArray(output) ? output[0] : output;

	consola.success("Build completed successfully! 🎉");
	consola.info(`Build time: ${buildTime}ms`);

	consola.info("Build details:");
	for (const _result of result.output) {
		const stats = await stat(join(cwd, "dist", _result.fileName));
		consola.info(`- ${join(cwd, "dist", _result.fileName)}`);
		consola.info(
			`  - size: ${colors.yellow(`${(stats.size / 1024).toFixed(2)} KB`)} (${colors.yellow(stats.size)} bytes)`,
		);
	}
}
