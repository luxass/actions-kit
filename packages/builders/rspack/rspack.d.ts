declare module "@actions-sdk/config" {
	import type { Configuration } from "@rspack/core";

	interface ActionsKitConfig {
		rspack?: Configuration;
	}
}

export {};
