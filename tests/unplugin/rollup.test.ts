import { readFile } from "node:fs/promises";
import { join } from "node:path";
import typescriptPlugin from "@rollup/plugin-typescript";
import { rollup } from "rollup";
import { expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/rollup";

it("expect `actions-kit.d.ts` to be generated", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/action.yaml");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const bundle = await rollup({
    input: join(testdirPath, "index.ts"),
    external: ["@actions/core"],
    plugins: [
      typescriptPlugin({
        tsconfig: join(testdirPath, "tsconfig.json"),
      }),
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
      }),
    ],
  });

  const { output } = await bundle.generate({
    format: "cjs",
    sourcemap: false,
  });

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

  expect(output[0]).toBeDefined();
  expect(output[0].code).toBeDefined();

  expect(output[0].code).toMatchSnapshot();
  expect(dtsOutput).toMatchSnapshot();
});

it("expect `actions-kit.d.ts` to include `ACTION_INPUTS`", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/action.yaml");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const bundle = await rollup({
    input: join(testdirPath, "index.ts"),
    external: ["@actions/core"],
    plugins: [
      typescriptPlugin({
        tsconfig: join(testdirPath, "tsconfig.json"),
      }),
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
        injectInputs: true,
      }),
    ],
  });

  const { output } = await bundle.generate({
    format: "cjs",
    sourcemap: false,
  });

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

  expect(output[0]).toBeDefined();
  expect(output[0].code).toBeDefined();
  expect(output[0].code).toContain("ACTION_INPUTS");
  expect(dtsOutput).toContain("ACTION_INPUTS");

  expect(output[0].code).toMatchSnapshot();
  expect(dtsOutput).toMatchSnapshot();
});
