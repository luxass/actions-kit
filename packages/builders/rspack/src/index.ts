/// <reference types="../rspack.d.ts" />
import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { Configuration, Stats } from "@rspack/core";
import { join, resolve } from "node:path";

export interface BuilderOptions {
	cwd: string;
	config: ActionsKitConfig;
	libraryType: "esm" | "cjs";
	outputFileName: string;
}

export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions) {
	const rspack = await import("@rspack/core").then((m) => m.rspack);
	const rspackActionsKit = await import("unplugin-actions-kit/rspack").then((m) => m.default);

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
			}),
		],
		externals: {
			keytar: "commonjs keytar",
		},
	} satisfies Configuration);

	const compiler = rspack(rspackOptions);

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
