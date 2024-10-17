import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { build } from "vite";
import { expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/vite";

it("expect `actions-kit.d.ts` to be generated", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/without-globals");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const result = await build({
    build: {
      lib: {
        entry: join(testdirPath, "index.ts"),
        formats: ["cjs"],
        fileName: "bundle",
        name: "bundle",
      },
      rollupOptions: {
        external: ["@actions/core"],
      },
      minify: false,
    },
    plugins: [
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
      }),
    ],
  });

  if (!Array.isArray(result)) {
    expect.fail("result is not an array");
  }

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");
  expect(result).toBeDefined();

  const firstResult = result[0];

  expect(firstResult).toBeDefined();
  expect(firstResult!.output).toBeDefined();
  expect(firstResult!.output[0]).toBeDefined();
  expect(firstResult!.output[0].code).toBeDefined();

  expect(dtsOutput).toMatchSnapshot();
  expect(firstResult!.output[0].code).toMatchSnapshot();
});

it("expect `actions-kit.d.ts` to include `ACTION_INPUTS`", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/without-globals");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const result = await build({
    build: {
      lib: {
        entry: join(testdirPath, "index.ts"),
        formats: ["cjs"],
        fileName: "bundle",
        name: "bundle",
      },
      rollupOptions: {
        external: ["@actions/core"],
      },
      minify: false,
    },
    plugins: [
      ActionKitPlugin({
        actionPath: join(testdirPath, "action.yaml"),
      }),
    ],
  });

  if (!Array.isArray(result)) {
    expect.fail("result is not an array");
  }

  const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");
  expect(result).toBeDefined();

  const firstResult = result[0];

  expect(firstResult).toBeDefined();
  expect(firstResult!.output).toBeDefined();
  expect(firstResult!.output[0]).toBeDefined();
  expect(firstResult!.output[0].code).toBeDefined();

  expect(dtsOutput).toMatchSnapshot();
  expect(firstResult!.output[0].code).toMatchSnapshot();

  expect(firstResult!.output[0].code).toContain("ACTION_INPUTS");
  expect(dtsOutput).toContain("ACTION_INPUTS");
});
