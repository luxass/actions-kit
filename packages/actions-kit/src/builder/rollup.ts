import { inferModuleType, inferOutputFilename } from "../utils";
import type { Config } from "../config";
import actionsKit from "unplugin-actions-kit/rollup";
import { join } from "node:path";
import { builtinModules } from "node:module";

export async function build(config: Config) {
	const rollup = await import("rollup").then((m) => m.rollup);
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const rollupConfig = config.rollup;

	const bundle = await rollup({
		input: "./src/index.ts",
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
		output: {
			file: join(process.cwd(), "dist", outputFileName),
			format: libraryType,
			exports: "auto",
		},
		plugins: [
			actionsKit({
				// TODO: allow users to specify it.
				actionPath: join(process.cwd(), "./action.yml"),
				inject: true,
			}),
		],
	});

	const wrote = await bundle.write({
		format: libraryType,
		sourcemap: false,
	});

  console.log(wrote);
}
