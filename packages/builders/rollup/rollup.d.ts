declare module "@actions-sdk/config" {
	interface ActionsKitConfig {
		rollup?: import("rollup").RollupOptions;
	}
}

export {};
