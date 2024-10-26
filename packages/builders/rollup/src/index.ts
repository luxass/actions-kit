/// <reference types="../rollup.d.ts" />
import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { RollupOptions } from "rollup";
import { join } from "node:path";
import consola from "consola";
import { builtinModules } from "node:module";

export interface BuilderOptions {
	cwd: string;
	config: ActionsKitConfig;
	libraryType: "esm" | "cjs";
	outputFileName: string;
}

export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions) {
	const build = await import("rollup").then((m) => m.rollup);
	const rollupActionsKit = await import("unplugin-actions-kit/rollup").then((m) => m.default);

	const [commonjs, resolve, typescript] = await Promise.all([
		import("@rollup/plugin-commonjs").then((m) => m.default),
		import("@rollup/plugin-node-resolve").then((m) => m.default),
		import("@rollup/plugin-typescript").then((m) => m.default),
	]);

	const rollupOptions = defu(config.rollup, {
		// FIX: input should be inferred from the config
		input: "./src/index.ts",
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
		output: {
			file: join(cwd, "dist", outputFileName),
			format: libraryType,
			exports: "auto",
		},
		plugins: [
			typescript({
				tsconfig: "./tsconfig.json",
				declaration: false,
			}),
			resolve({
				preferBuiltins: true,
			}),
			commonjs(),
			rollupActionsKit({
				// TODO: allow users to specify it.
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
				autocomplete: config.autocomplete,
			}),
		],
	} satisfies RollupOptions);

	const builder = await build(rollupOptions);

	const result = await builder.write({
		file: join(cwd, "dist", outputFileName),
		format: libraryType,
		sourcemap: false,
	});

	consola.info("Build complete", result);
}
