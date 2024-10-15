import { readdir, readFile } from "node:fs/promises";
import { build } from "esbuild";
import { expect, it } from "vitest";
import { testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/esbuild";

it("expect `actions-kit.d.ts` to be generated", async () => {
  const path = await testdir({
    "file1.txt": "Hello, World!",
    "file2.txt": "Hello, Vitest!",
  });

  expect(path).toBeDefined();
  expect(path).toContain(".vitest-testdirs/vitest-testdir-isolated-test");

  const file = await readFile(`${path}/file1.txt`, "utf8");
  expect(file).toBe("Hello, World!");
  await build({
    entryPoints: [
      "./tests/fixtures/action.yaml/index.ts",
    ],
    platform: "node",
    format: "cjs",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      ActionKitPlugin({
        actionPath: "./tests/fixtures/action.yaml/action.yaml",
      }),
    ],
  });

  const dtsOutput = await readFile("./tests/fixtures/action.yaml/actions-kit.d.ts", "utf-8");

  expect(dtsOutput).toMatchSnapshot();
});

it("expect `actions-kit.d.ts` to be generated with injected inputs", async () => {
  await build({
    entryPoints: [
      "./tests/fixtures/action.yaml/index.ts",
    ],
    platform: "node",
    format: "cjs",
    write: false,
    bundle: true,
    minifySyntax: false,
    plugins: [
      ActionKitPlugin({
        actionPath: "./tests/fixtures/action.yaml/action.yaml",
        injectInputs: true,
      }),
    ],
  });

  const dtsOutput = await readFile("./tests/fixtures/action.yaml/actions-kit.d.ts", "utf-8");

  expect(dtsOutput).toMatchSnapshot();
});
