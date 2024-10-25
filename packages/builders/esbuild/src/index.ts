import type { ActionsKitConfig } from "actions-kit/config";
import { defu } from "defu";
import type { BuildOptions as ESBuildBuildOptions } from "esbuild";
import { getESBuildEntryPoint } from "./utils";
import { join } from "node:path";
import consola from "consola";

export interface BuilderOptions {
	cwd: string;
	config: ActionsKitConfig;
	libraryType: "esm" | "cjs";
	outputFileName: string;
}

export async function build({ cwd, config, libraryType, outputFileName }: BuilderOptions) {
	const build = await import("esbuild").then((m) => m.build);
	const esbuildActionsKit = await import("unplugin-actions-kit/esbuild").then((m) => m.default);

	const defaultEntryPoint = join(cwd, "src/index.ts");
	const entryPoints = getESBuildEntryPoint(config.esbuild?.entryPoints, defaultEntryPoint);

	if (config.esbuild?.entryPoints) {
		config.esbuild.entryPoints = undefined;
	}

	const esbuildOptions = defu(config.esbuild, {
		entryPoints: [entryPoints],
		platform: "node",
		target: "node20",
		format: libraryType,
		bundle: true,
		outfile: join(cwd, "dist", outputFileName),
		plugins: [
			esbuildActionsKit({
				actionPath: join(cwd, "./action.yml"),
				inject: config.inject,
			}),
		],
	} satisfies ESBuildBuildOptions);

	const result = await build(
		// TODO: fix later
		esbuildOptions as ESBuildBuildOptions
	);

	consola.info("Build complete", result);
}
