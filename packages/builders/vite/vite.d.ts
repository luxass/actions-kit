declare module "@actions-kit/config" {
	import type { InlineConfig } from "vite";

	interface ActionsKitConfig {
		vite?: InlineConfig;
	}
}

export {};
