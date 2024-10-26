/// <reference types="../rspack.d.ts" />

import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { Configuration, Stats } from "@rspack/core";
import { join, resolve } from "node:path";
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
export async function build({
	cwd,
	config,
	libraryType,
	outputFileName,
}: BuilderOptions): Promise<void> {
	const rspack = await import("@rspack/core").then((m) => m.rspack);
	const rspackActionsKit = await import("unplugin-actions-kit/rspack").then((m) => m.default);

	// TODO: prevent multiple entry points

	const rspackOptions = defu(config.rspack, {
		target: "node",
		mode: "production",
		entry: "./src/index.ts",
		output: {
			path: resolve(cwd, "dist"),
			filename: outputFileName,
			library: {
				type: libraryType === "esm" ? "module" : "commonjs2",
			},
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		optimization: {
			minimize: false,
		},
		devtool: false,
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: [/node_modules/],
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "typescript",
							},
						},
					},
					type: "javascript/auto",
				},
			],
		},
		experiments: {
			rspackFuture: {
				bundlerInfo: {
					force: true,
				},
			},
		},
		plugins: [
			rspackActionsKit({
				// TODO: allow users to specify it.
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
				autocomplete: config.autocomplete,
			}),
		],
		externals: {
			keytar: "commonjs keytar",
		},
	} satisfies Configuration);

	const startTime = performance.now();

	const compiler = rspack(rspackOptions);

	const stats = await new Promise<Stats | undefined>((resolve, reject) =>
		compiler.run((err, stats) => {
			if (err) {
				// TODO: handle errors better
				reject(err);
			} else {
				resolve(stats as unknown as Stats);
			}
		}),
	);

	const buildTime = performance.now() - startTime;

	if (!stats) {
		throw new Error("could not build");
	}

	const json = stats.toJson({
		all: false,
		assets: true,
	})

	consola.success("Build completed successfully! 🎉");
	consola.info(`Build time: ${buildTime}ms`);

	if (json.assets == null) {
		throw new Error("could not gather bundle information");
	}

	const assets = json.assets;

	consola.info("Build details:");
	for (const asset of assets) {
		consola.info(`- ${asset.name}`);
		consola.info(
			`  - size: ${colors.yellow(`${(asset.size / 1024).toFixed(2)} KB`)} (${colors.yellow(asset.size)} bytes)`,
		);
	}
}
