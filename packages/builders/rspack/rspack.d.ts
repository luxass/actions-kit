declare module "@actions-kit/config" {
	import type { Configuration } from "@rspack/core";

	interface ActionsKitConfig {
		rspack?: Configuration;
	}
}

export {};
