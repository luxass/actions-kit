import type { BuildOutput } from "actions-kit/builder";
import type { Configuration, Stats } from "webpack";
import { join } from "node:path";
import { defineBuilder } from "actions-kit/builder";
import { inferModuleType, inferOutput } from "actions-kit/builder-utils";
import { defu } from "defu";
import WebpackActionsKit from "unplugin-actions-kit/webpack";
import { webpack } from "webpack";

export default function webpackBuilder(options: Configuration = {}) {
  return defineBuilder({
    name: "webpack",
    build: async ({ cwd, config }) => {
      const { filename, dir } = await inferOutput(config);
      const libraryType = await inferModuleType(config, filename);

      const webpackOptions = defu(options, {
        target: "node",
        mode: "production",
        entry: "./src/index.ts",
        output: {
          path: dir,
          filename,
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
          WebpackActionsKit({
            // TODO: allow users to specify it.
            actionPath: join(cwd, "./action.yml"),
            inject: config.inject,
            autocomplete: config.autocomplete,
          }),
        ],
      } satisfies Configuration);

      const compiler = webpack(webpackOptions);

      const stats = await new Promise<Stats | undefined>((resolve, reject) => {
        if (compiler == null) {
          return reject(new Error("webpack compiler is not defined"));
        }

        compiler.run((err, stats) => {
          if (err) {
            reject(err);
          } else {
            resolve(stats as unknown as Stats);
          }
        })
      });

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
