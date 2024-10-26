/// <reference types="../webpack.d.ts" />

import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { Configuration, Stats } from "webpack";
import { join, resolve } from "node:path";

export interface BuilderOptions {
	cwd: string;
	config: ActionsKitConfig;
	libraryType: "esm" | "cjs";
	outputFileName: string;
}

export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions) {
	const webpack = await import("webpack").then((m) => m.default);
	const webpackActionsKit = await import("unplugin-actions-kit/webpack").then((m) => m.default);

	const webpackOptions = defu(config.webpack, {
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
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: "swc-loader",
					},
				},
			],
		},
		plugins: [
			webpackActionsKit({
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

	const compiler = webpack.webpack(webpackOptions);

	const stats = await new Promise<Stats | undefined>((resolve, reject) =>
		compiler.run((err, stats) => {
			if (err) {
				reject(err);
			} else {
				resolve(stats as unknown as Stats);
			}
		}),
	);

	if (!stats) {
		throw new Error("could not build");
	}

	stats.toString({
		chunks: true,
		colors: true,
	});
}
