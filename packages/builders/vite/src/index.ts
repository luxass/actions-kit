/// <reference types="../vite.d.ts" />

import type { ActionsKitConfig } from "@actions-kit/config";
import { defu } from "defu";
import type { InlineConfig } from "vite";
import { join, resolve } from "node:path";
import { consola } from "consola";

export interface BuilderOptions {
	cwd: string;
	config: ActionsKitConfig;
	libraryType: "esm" | "cjs";
	outputFileName: string;
}

export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions) {
	const viteBuild = await import("vite").then((m) => m.build);
	const viteActionsKit = await import("unplugin-actions-kit/vite").then((m) => m.default);

	const viteOptions = defu(config.vite, {
		build: {
			minify: false,
			target: "node20",
			ssr: true,
			rollupOptions: {
				input: ["src/index.ts"],
				output: {
					entryFileNames: outputFileName,
					format: libraryType,
					exports: "auto",
				},
			},
		},
		ssr: {
			// Anything NOT 'node:' will be bundled.
			noExternal: /^(?!node:)/,
		},
		plugins: [
			viteActionsKit({
				// TODO: allow users to specify it.
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
			}),
		],
	} satisfies InlineConfig);

	const result = await viteBuild(viteOptions);

	const results = Array.isArray(result) ? result : [result];

	consola.info("Build output: ", results);
}
