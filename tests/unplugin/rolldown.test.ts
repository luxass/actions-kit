import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { rolldown } from "rolldown";
import { describe, expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../../src/unplugin/rolldown";

it("expect no `actions-kit.d.ts` file generated if plugin not in use", async () => {
  const directoryJson = await fromFileSystem("./tests/fixtures/basic");
  const testdirPath = await testdir(directoryJson);

  expect(testdirPath).toBeDefined();

  const bundle = await rolldown({
    input: join(testdirPath, "index.ts"),
    platform: "node",
    external: ["@actions/core"],
  });

  const { output } = await bundle.generate({
    format: "cjs",
    sourcemap: false,
  });

  expect(output[0]).toBeDefined();
  expect(output[0].code).toBeDefined();
  expect(output[0].code).toMatchSnapshot();

  const files = await readdir(testdirPath);
  expect(files).not.toContain("actions-kit.d.ts");
});
