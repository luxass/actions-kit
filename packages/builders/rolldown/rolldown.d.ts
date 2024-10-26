declare module "@actions-sdk/config" {
	interface ActionsKitConfig {
		rolldown?: import("rolldown").RolldownOptions;
	}
}

export {};
