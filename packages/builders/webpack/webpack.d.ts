declare module "@actions-sdk/config" {
	interface ActionsKitConfig {
		webpack?: import("webpack").Configuration;
	}
}

export {};
