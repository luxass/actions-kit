import { inferModuleType, inferOutputFilename } from "../utils";
import type { Config } from "../config";
import actionsKit from "unplugin-actions-kit/vite";
import { join } from "node:path";

export async function build(config: Config) {
	const viteBuild = await import("vite").then((m) => m.build);
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const result = await viteBuild({
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
			actionsKit({
				// TODO: allow users to specify it.
				actionPath: join(process.cwd(), "./action.yml"),
				inject: true,
			}),
		],
	});

	const results = Array.isArray(result) ? result : [result];

	// TODO: show build output
}
