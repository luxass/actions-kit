/// <reference types="../rolldown.d.ts" />
import type { ActionsKitConfig } from "@actions-sdk/config";
import { defu } from "defu";
import type { RolldownOptions } from "rolldown";
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
	const build = await import("rolldown").then((m) => m.rolldown);
	const rolldownActionsKit = await import("unplugin-actions-kit/rolldown").then((m) => m.default);

	const rolldownOptions = defu(config.rolldown, {
		// FIX: input should be inferred from the config
		input: "./src/index.ts",
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
		resolve: {
			conditionNames: ["import"],
		},
		platform: "node",
		plugins: [
			rolldownActionsKit({
				// TODO: allow users to specify it.
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
				autocomplete: config.autocomplete,
			}),
		],
	} satisfies RolldownOptions);

	const builder = await build(rolldownOptions);

	const result = await builder.write({
		format: libraryType,
		sourcemap: false,
	});

	consola.info("Build complete", result);
}
