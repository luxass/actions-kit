import "zod";
import { defu } from "defu";
import type { Configuration, Stats } from "@rspack/core";
import { join } from "node:path";
import { defineBuilder, type BuildOutput } from "actions-kit/builder";
import { inferModuleType, inferOutput } from "actions-kit/builder-utils";
import { rspack } from "@rspack/core";
import RspackActionsKit from "unplugin-actions-kit/rspack";

export default function rspackBuilder(options: Configuration = {}) {
	return defineBuilder({
		name: "rspack",
		build: async ({ cwd, config }) => {
			const { filename, dir } = await inferOutput(config);
			const libraryType = await inferModuleType(config, filename);

			const rspackOptions = defu(options, {
				target: "node",
				mode: "production",
				entry: "./src/index.ts",
				output: {
					path: dir,
					filename: filename,
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
					RspackActionsKit({
						// TODO: allow users to specify it.
						actionPath: join(cwd, "./action.yml"),
						inject: config.inject,
						autocomplete: config.autocomplete,
					}),
				],
			} satisfies Configuration);

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

			if (!stats) {
				throw new Error("could not build");
			}

			const json = stats.toJson({
				all: false,
				assets: true,
			});

			const output: BuildOutput[] = [];

			if (json.assets == null) {
				throw new Error("could not gather bundle information");
			}

			const assets = json.assets;

			for (const asset of assets) {
				output.push({
					name: asset.name,
					path: join(dir, asset.name),
					size: asset.size,
				});
			}

			return output;
		},
	});
}
