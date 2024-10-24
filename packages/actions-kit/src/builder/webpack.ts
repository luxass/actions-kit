// TODO: remove this at some point
//       will need to debug why the dev build fails
//       when its not there.
import "zod";
import type { Configuration as WebpackConfig, Stats } from "webpack";
import { join, resolve } from "node:path";
import { defu } from "defu";
import actionsKit from "unplugin-actions-kit/webpack";
import type { Config } from "../config";
import { inferModuleType, inferOutputFilename } from "../utils";

export async function build(config: Config) {
	const webpack = await import("webpack").then((m) => m.default);
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const webpackConfig = config.webpack;
	const webpackOptions = defu(webpackConfig, {
		target: "node",
		mode: "production",
		entry: "./src/index.ts",
		output: {
			path: resolve(process.cwd(), "dist"),
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
	} satisfies WebpackConfig);

	const compiler = webpack.webpack(webpackOptions);

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
}
