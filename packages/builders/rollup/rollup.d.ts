declare module "@actions-sdk/config" {
	import type { RollupOptions } from "rollup";

	interface ActionsKitConfig {
		rollup?: RollupOptions;
	}
}

export {};
