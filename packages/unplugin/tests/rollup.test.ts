import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import typescriptPlugin from "@rollup/plugin-typescript";
import { rollup } from "rollup";
import { describe, expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import ActionKitPlugin from "../src/rollup";

it("expect no `actions-kit.d.ts` file generated if plugin not in use", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
	const testdirPath = await testdir(directoryJson);

	expect(testdirPath).toBeDefined();

	const bundle = await rollup({
		input: join(testdirPath, "index.ts"),
		plugins: [
			typescriptPlugin({
				tsconfig: join(testdirPath, "tsconfig.json"),
			}),
		],
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

it("expect `actions-kit.d.ts` to be generated", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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

describe("augmentations", () => {
	it("expect only inputs to be augmented", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-inputs"));
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

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("expect only outputs to be augmented", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-outputs"));
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

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("expect no augmentations", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/empty"));
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

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("expect no augmentation when `autocomplete` is disabled", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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
					autocomplete: false,
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

		expect(dtsOutput).not.toContain("@actions/core");
		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});
});

describe("inject", () => {
	it("expect `ACTION_INPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-inputs"));
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
					inject: "inputs",
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

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("throw if missing `inputs`", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-outputs"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		await expect(
			async () =>
				await rollup({
					input: join(testdirPath, "index.ts"),
					external: ["@actions/core"],
					plugins: [
						typescriptPlugin({
							tsconfig: join(testdirPath, "tsconfig.json"),
						}),
						ActionKitPlugin({
							actionPath: join(testdirPath, "action.yaml"),
							inject: "inputs",
						}),
					],
				}),
		).rejects.toThrow("inputs is not defined in action.yml");
	});

	it("expect `ACTION_OUTPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-outputs"));
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
					inject: "outputs",
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

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).toContain("ACTION_OUTPUTS");
		expect(dtsOutput).not.toContain("ActionInputName");
		expect(dtsOutput).not.toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("throw if missing `outputs`", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-inputs"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		await expect(
			async () =>
				await rollup({
					input: join(testdirPath, "index.ts"),
					external: ["@actions/core"],
					plugins: [
						typescriptPlugin({
							tsconfig: join(testdirPath, "tsconfig.json"),
						}),
						ActionKitPlugin({
							actionPath: join(testdirPath, "action.yaml"),
							inject: "outputs",
						}),
					],
				}),
		).rejects.toThrow("outputs is not defined in action.yml");
	});

	it("expect `ACTION_INPUTS` & `ACTION_OUTPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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
					inject: true,
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

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});

	it("expect no change in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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
					inject: false,
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

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).not.toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
		expect(output[0].code).toMatchSnapshot();
	});
});

it("custom output path", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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
				outputPath: join(testdirPath, "custom"),
			}),
		],
	});

	const { output } = await bundle.generate({
		format: "cjs",
		sourcemap: false,
	});

	const dtsOutput = await readFile(join(testdirPath, "custom", "actions-kit.d.ts"), "utf-8");

	expect(output[0]).toBeDefined();
	expect(output[0].code).toBeDefined();
	expect(output[0].code).toMatchSnapshot();
	expect(dtsOutput).toMatchSnapshot();
});
