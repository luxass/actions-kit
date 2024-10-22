// TODO: remove this at some point
//       will need to debug why the dev build fails
//       when its not there.
import "zod";
import type { Configuration as RspackConfig, Stats } from "@rspack/core";
import { rspack } from "@rspack/core";
import { join, resolve } from "node:path";
import { defu } from "defu";
import actionsKit from "unplugin-actions-kit/rspack";
import type { Config } from "../config";
import { writeFile } from "node:fs/promises";
import fs from "node:fs";
import { inferModuleType, inferOutputFilename } from "../utils";

export async function build(config: Config) {

	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	console.log("Building with outputFileName", outputFileName, "and libraryType", libraryType);

	const rspackConfig = config.rspack;
	const rspackOptions = defu(rspackConfig, {
		target: "node",
		mode: "production",
		entry: "./src/index.ts",
		output: {
			path: resolve(process.cwd(), "dist"),
			filename: outputFileName,
			library: {
				type: libraryType,
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
			actionsKit({
				// TODO: allow users to specify it.
				actionPath: join(process.cwd(), "./action.yml"),
				inject: true,
			}),
		],
		externals: {
			keytar: "commonjs keytar",
		},
	} satisfies RspackConfig);
	const compiler = rspack(rspackOptions);

	const stats = await new Promise<Stats | undefined>((resolve, reject) =>
		compiler.run((err, stats) => {
			if (err) {
				reject(err);
			} else {
				resolve(stats as Stats);
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

	// const json = stats.toJson()
}
