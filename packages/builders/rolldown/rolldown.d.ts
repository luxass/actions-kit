declare module "@actions-kit/config" {
	import type { RolldownOptions } from "rolldown";

	interface ActionsKitConfig {
		rolldown?: RolldownOptions;
	}
}

export {};
