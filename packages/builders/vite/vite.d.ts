declare module "@actions-sdk/config" {
	interface ActionsKitConfig {
		vite?: import("vite").InlineConfig;
	}
}

export {};
