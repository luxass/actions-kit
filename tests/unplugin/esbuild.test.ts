import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/esbuild";

describe("without references to globals", () => {
  it("expect `actions-kit.d.ts` to be generated", async () => {
    const directoryJson = await fromFileSystem("./tests/fixtures/without-globals");
    const testdirPath = await testdir(directoryJson);

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "index.ts"),
      ],
      platform: "node",
      format: "cjs",
      write: false,
      bundle: false,
      minifySyntax: false,
      plugins: [
        ActionKitPlugin({
          actionPath: join(testdirPath, "action.yaml"),
        }),
      ],
    });

    const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

    expect(result).toBeDefined();
    expect(result.outputFiles).toBeDefined();
    const output = result.outputFiles[0];
    expect(output).toBeDefined();
    expect(output?.text).toBeDefined();
    expect(dtsOutput).toMatchSnapshot();
    expect(output?.text).toMatchSnapshot();
  });

  it("expect `actions-kit.d.ts` to include `ACTION_INPUTS`", async () => {
    const directoryJson = await fromFileSystem("./tests/fixtures/without-globals");
    const testdirPath = await testdir(directoryJson);

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "index.ts"),
      ],
      platform: "node",
      format: "cjs",
      write: false,
      bundle: false,
      minifySyntax: false,
      plugins: [
        ActionKitPlugin({
          actionPath: join(testdirPath, "action.yaml"),
          injectInputs: true,
        }),
      ],
    });

    const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

    expect(result).toBeDefined();
    expect(result.outputFiles).toBeDefined();
    const output = result.outputFiles[0];
    expect(output).toBeDefined();
    expect(output?.text).toBeDefined();
    expect(dtsOutput).toMatchSnapshot();
    expect(output?.text).toMatchSnapshot();

    expect(output?.text).toContain("ACTION_INPUTS");
    expect(dtsOutput).toContain("ACTION_INPUTS");
  });
});

describe("with references to globals", () => {
  it("expect `actions-kit.d.ts` to be generated", async () => {
    const directoryJson = await fromFileSystem("./tests/fixtures/with-globals");
    const testdirPath = await testdir(directoryJson);

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "index.ts"),
      ],
      platform: "node",
      format: "cjs",
      write: false,
      bundle: false,
      minifySyntax: false,
      plugins: [
        ActionKitPlugin({
          actionPath: join(testdirPath, "action.yaml"),
        }),
      ],
    });

    const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

    expect(result).toBeDefined();
    expect(result.outputFiles).toBeDefined();
    const output = result.outputFiles[0];
    expect(output).toBeDefined();
    expect(output?.text).toBeDefined();
    expect(dtsOutput).toMatchSnapshot();
    expect(output?.text).toMatchSnapshot();
  });

  it("expect `actions-kit.d.ts` to include `ACTION_INPUTS`", async () => {
    const directoryJson = await fromFileSystem("./tests/fixtures/with-globals");
    const testdirPath = await testdir(directoryJson);

    expect(testdirPath).toBeDefined();

    const result = await build({
      entryPoints: [
        join(testdirPath, "index.ts"),
      ],
      platform: "node",
      format: "cjs",
      write: false,
      bundle: false,
      minifySyntax: false,
      plugins: [
        ActionKitPlugin({
          actionPath: join(testdirPath, "action.yaml"),
          injectInputs: true,
        }),
      ],
    });

    const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

    expect(result).toBeDefined();
    expect(result.outputFiles).toBeDefined();
    const output = result.outputFiles[0];
    expect(output).toBeDefined();
    expect(output?.text).toBeDefined();
    expect(dtsOutput).toMatchSnapshot();
    expect(output?.text).toMatchSnapshot();

    expect(output?.text).toContain("ACTION_INPUTS");
    expect(dtsOutput).toContain("ACTION_INPUTS");
  });
});
