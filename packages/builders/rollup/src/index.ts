/// <reference types="../rollup.d.ts" />

import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { RollupOptions } from "rollup";
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
	const build = await import("rollup").then((m) => m.rollup);
	const rollupActionsKit = await import("unplugin-actions-kit/rollup").then((m) => m.default);

	const [commonjs, resolve, typescript] = await Promise.all([
		import("@rollup/plugin-commonjs").then((m) => m.default),
		import("@rollup/plugin-node-resolve").then((m) => m.default),
		import("@rollup/plugin-typescript").then((m) => m.default),
	]);

	const rollupOptions = defu(config.rollup, {
		// FIX: input should be inferred from the config
		input: "./src/index.ts",
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
		output: {
			file: join(cwd, "dist", outputFileName),
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
			rollupActionsKit({
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

	const startTime = performance.now();

	const builder = await build(rollupOptions);

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
