declare module "actions-kit/config" {
	import type { BuildOptions as ESBuildBuildOptions } from "esbuild";

	interface ActionsKitConfig {
		esbuild?: ESBuildBuildOptions;
	}
}

export {};
