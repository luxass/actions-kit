import { inferModuleType, inferOutputFilename } from "../utils";
import type { Config } from "../config";
import actionsKit from "unplugin-actions-kit/rolldown";
import { join } from "node:path";
import { builtinModules } from "node:module";

export async function build(config: Config) {
	const rolldown = await import("rolldown").then((m) => m.rolldown);
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const rolldownConfig = config.rolldown;

	const bundle = await rolldown({
		input: "./src/index.ts",
		resolve: {
			conditionNames: ["import"],
		},
    platform: "node",
		external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
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
