declare module "@actions-sdk/config" {
	export interface ActionsKitConfig {
		esbuild?: import("esbuild").BuildOptions;
	}
}

export {};
