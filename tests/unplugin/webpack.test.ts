import { readFile } from "node:fs/promises";
import path, { join } from "node:path";
import { expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import { type Configuration, webpack as createWebpack, type Stats } from "webpack";
import ActionKitPlugin from "../../src/unplugin/webpack";

async function webpack(testdirPath: string, config: Configuration): Promise<Stats | undefined> {
  return new Promise((resolve, reject) => {
    const compiler = createWebpack({
      optimization: {
        minimize: false,
      },
      output: {
        path: path.resolve(testdirPath),
        filename: `${Date.now()}-bundle.js`,
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
          ...(config.module?.rules || []),
        ],
        ...config.module,
      },
      resolve: {
        preferRelative: true,
        extensions: [".tsx", ".ts", ".js"],
        extensionAlias: {
          ".js": [".js", ".ts"],
          ".cjs": [".cjs", ".cts"],
          ".mjs": [".mjs", ".mts"],
        },
      },
      target: "node",
      mode: "production",
      externals: ["@actions/core"],
      externalsType: "commonjs",
      ...config,
    });

    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats);
    });
  });
}

it("expect `actions-kit.d.ts` to be generated", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/action.yaml");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const result = await webpack(testdirPath, {
    entry: join(testdirPath, "index.ts"),
    plugins: [
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
      }),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  expect(json?.errors).toBeDefined();

  if ((json?.errors || []).length > 0) {
    console.error(json?.errors);
  }

  expect(json?.errors).toHaveLength(0);

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

  expect(content).toMatchSnapshot();

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

  expect(dtsOutput).toMatchSnapshot();
});

it("expect `actions-kit.d.ts` to include `ACTION_INPUTS`", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/action.yaml");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const result = await webpack(testdirPath, {
    entry: join(testdirPath, "index.ts"),
    plugins: [
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
        injectInputs: true,
      }),
    ],
  });

  const json = result?.toJson();
  expect(json).toBeDefined();

  expect(json?.errors).toBeDefined();

  if ((json?.errors || []).length > 0) {
    console.error(json?.errors);
  }

  expect(json?.errors).toHaveLength(0);

  const file = json!.assetsByChunkName!.main;
  const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

  expect(dtsOutput).toMatchSnapshot();
  expect(content).toMatchSnapshot();

  expect(content).toContain("ACTION_INPUTS");
  expect(dtsOutput).toContain("ACTION_INPUTS");
});
