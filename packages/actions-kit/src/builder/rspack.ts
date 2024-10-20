import type { Configuration as RspackConfig, Stats } from "@rspack/core";
import { rspack } from "@rspack/core";
import { resolve } from "node:path";
import { defu } from "defu";
import actionsKit from "unplugin-actions-kit/rspack";
import type { Config } from "../config";
import { writeFile } from "node:fs/promises";

export async function build(config: Config) {
  const rspackConfig = config.rspack
  const rspackOptions = defu(rspackConfig,{
    target: "node",
    mode: "production",
    entry: "./src/index.ts",
    output: {
      path: resolve(process.cwd(), "dist"),
      filename: "index.cjs",
      library: {
        type: "commonjs2",
      },
    },
    resolve: {
      extensions: [".ts", ".js"],
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
        actionPath: "./action.yml",
        inject: true,
      }),
    ],
    externals: {
      keytar: "commonjs keytar",
    },
  } satisfies RspackConfig)
  const compiler = rspack(rspackOptions)

  const stats = await new Promise<Stats | undefined>((resolve, reject) => compiler.run((err, stats) => {
    if (err) {
      reject(err)
    } else {
      resolve(stats as Stats)
    }
  }))

  if (!stats) {
    throw new Error("stats is undefined.")
  }

  const json = stats.toJson()

  // write files
  console.log({
    assets: json.assets,
    chunkName: json.assetsByChunkName,
    chunks: json.chunks,
  })

  if (json.assets == null || json.assets.length === 0) {
    throw new Error("assets is empty.")
  }

  // write files to disk
  for (const asset of json.assets) {
    if (asset.source == null) {
      throw new Error("asset.source is empty.")
    }
    await writeFile(resolve(rspackOptions.output.path, asset.name), asset.source)
  }
}
