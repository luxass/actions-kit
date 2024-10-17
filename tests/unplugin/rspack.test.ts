import { readdir, readFile } from "node:fs/promises";
import path, { join } from "node:path";
import { type Configuration, rspack as createRspack, type Stats } from "@rspack/core";
import { build } from "esbuild";
import { expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/rspack";

async function rspack(testdirPath: string, config: Configuration): Promise<Stats | undefined> {
  return new Promise((resolve, reject) => {
    const compiler = createRspack({
      optimization: {
        minimize: false,
      },
      resolve: {
        preferRelative: true,
      },
      output: {
        path: path.resolve(testdirPath),
        filename: `${Date.now()}-bundle.js`,
      },
      target: "node",
      mode: "production",
      externals: ["@actions/core"],
      externalsType: "commonjs",
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
          ...(config.module?.rules || []),
        ],
        ...config.module,
      },
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

  const result = await rspack(testdirPath, {
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

  const result = await rspack(testdirPath, {
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
