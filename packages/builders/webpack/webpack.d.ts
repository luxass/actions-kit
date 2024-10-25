declare module "@actions-sdk/config" {
	import type { Configuration } from "webpack";

	interface ActionsKitConfig {
		webpack?: Configuration;
	}
}

export {};
