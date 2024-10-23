import { inferModuleType, inferOutputFilename } from "../utils";
import type { Config } from "../config";
import actionsKit from "unplugin-actions-kit/esbuild";
import { join } from "node:path";

export async function build(config: Config) {
	const esbuild = await import("esbuild").then((m) => m.build);
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const esbuildConfig = config.esbuild;

	const a = await esbuild({
		bundle: true,
		platform: "node",
		target: "node20",
		format: libraryType,
		outfile: join(process.cwd(), "dist", outputFileName),
		plugins: [
			actionsKit({
				// TODO: allow users to specify it.
				actionPath: join(process.cwd(), "./action.yml"),
				inject: true,
			}),
		],
	});
}
