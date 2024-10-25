declare module "@actions-sdk/config" {
	import type { BuildOptions as ESBuildBuildOptions } from "esbuild";

	interface ActionsKitConfig {
		esbuild?: ESBuildBuildOptions;
	}
}

export {};
