declare module "@actions-sdk/config" {
	import type { RolldownOptions } from "rolldown";

	interface ActionsKitConfig {
		rolldown?: RolldownOptions;
	}
}

export {};
