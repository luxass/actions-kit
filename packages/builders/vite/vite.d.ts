declare module "@actions-sdk/config" {
	import type { InlineConfig } from "vite";

	interface ActionsKitConfig {
		vite?: InlineConfig;
	}
}

export {};
