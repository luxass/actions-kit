import { inferModuleType, inferOutputFilename } from "../utils";
import type { Config } from "../config";
import { build as viteBuild } from "vite";

export async function build(config: Config) {
	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const viteConfig = config.vite;

	const viteOptions = {
		mode: "production",
		...viteConfig,
		build: {
			outDir: "dist",
			rollupOptions: {
				output: {
					fileName: outputFileName,
					format: libraryType,
				},
			},
		},
	};

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
	});

	console.log(result);
}
