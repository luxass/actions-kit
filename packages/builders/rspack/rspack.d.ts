declare module "@actions-sdk/config" {
	interface ActionsKitConfig {
		rspack?: import("@rspack/core").RspackOptions;
	}
}

export {};
