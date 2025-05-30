import { readdir, readFile } from "node:fs/promises";
import path, { join } from "node:path";
import { describe, expect, it } from "vitest";
import { fromFileSystem, testdir } from "vitest-testdirs";
import { type Configuration, webpack as createWebpack, type Stats } from "webpack";
import ActionKitPlugin from "../src/webpack";

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
						loader: require.resolve("ts-loader"),
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

it("expect no `actions-kit.d.ts` file generated if plugin not in use", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
	const testdirPath = await testdir(directoryJson);

	expect(testdirPath).toBeDefined();

	const result = await webpack(testdirPath, {
		entry: join(testdirPath, "index.ts"),
	});

	const json = result?.toJson();
	expect(json).toBeDefined();

	expect(json?.errors).toBeDefined();

	if ((json?.errors || []).length > 0) {
		console.error(json?.errors);
	}

	expect(json?.errors).toHaveLength(0);

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const file = json!.assetsByChunkName!.main;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

	expect(content).toMatchSnapshot();

	const files = await readdir(testdirPath);
	expect(files).not.toContain("actions-kit.d.ts");
});

it("expect `actions-kit.d.ts` to be generated", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
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

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const file = json!.assetsByChunkName!.main;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

	expect(content).toMatchSnapshot();

	const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

	expect(dtsOutput).toMatchSnapshot();
});

describe("augmentations", () => {
	it("expect only inputs to be augmented", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-inputs"));
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect only outputs to be augmented", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-outputs"));
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect no augmentations", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/empty"));
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect no augmentation when `autocomplete` is disabled", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		const result = await webpack(testdirPath, {
			entry: join(testdirPath, "index.ts"),
			plugins: [
				ActionKitPlugin({
					actionPath: join(testdirPath, "action.yaml"),
					autocomplete: false,
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).not.toContain("@actions/core");
		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ActionInputName");

		expect(dtsOutput).toMatchSnapshot();
	});
});

describe("inject", () => {
	it("expect `ACTION_INPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-inputs"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		const result = await webpack(testdirPath, {
			entry: join(testdirPath, "index.ts"),
			plugins: [
				ActionKitPlugin({
					actionPath: join(testdirPath, "action.yaml"),
					inject: "inputs",
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).not.toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect `ACTION_OUTPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/only-outputs"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		const result = await webpack(testdirPath, {
			entry: join(testdirPath, "index.ts"),
			plugins: [
				ActionKitPlugin({
					actionPath: join(testdirPath, "action.yaml"),
					inject: "outputs",
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).toContain("ACTION_OUTPUTS");
		expect(dtsOutput).not.toContain("ActionInputName");
		expect(dtsOutput).not.toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect `ACTION_INPUTS` & `ACTION_OUTPUTS` in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		const result = await webpack(testdirPath, {
			entry: join(testdirPath, "index.ts"),
			plugins: [
				ActionKitPlugin({
					actionPath: join(testdirPath, "action.yaml"),
					inject: true,
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
	});

	it("expect no change in global scope", async () => {
		const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
		const testdirPath = await testdir(directoryJson);

		expect(testdirPath).toBeDefined();

		const result = await webpack(testdirPath, {
			entry: join(testdirPath, "index.ts"),
			plugins: [
				ActionKitPlugin({
					actionPath: join(testdirPath, "action.yaml"),
					inject: false,
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

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const file = json!.assetsByChunkName!.main;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

		expect(content).toMatchSnapshot();

		const dtsOutput = await readFile(join(testdirPath, "actions-kit.d.ts"), "utf-8");

		expect(dtsOutput).toContain("ActionOutputName");
		expect(dtsOutput).not.toContain("ACTION_OUTPUTS");
		expect(dtsOutput).toContain("ActionInputName");
		expect(dtsOutput).not.toContain("ACTION_INPUTS");

		expect(dtsOutput).toMatchSnapshot();
	});
});

it("custom output path", async () => {
	const directoryJson = await fromFileSystem(join(import.meta.dirname, "fixtures/basic"));
	const testdirPath = await testdir(directoryJson);

	expect(testdirPath).toBeDefined();

	const result = await webpack(testdirPath, {
		entry: join(testdirPath, "index.ts"),
		plugins: [
			ActionKitPlugin({
				actionPath: join(testdirPath, "action.yaml"),
				outputPath: join(testdirPath, "custom"),
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

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const file = json!.assetsByChunkName!.main;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const content = await readFile(path.join(testdirPath, file![0]!), "utf-8");

	expect(content).toMatchSnapshot();

	const dtsOutput = await readFile(join(testdirPath, "custom", "actions-kit.d.ts"), "utf-8");

	expect(dtsOutput).toMatchSnapshot();
});
