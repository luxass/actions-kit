declare module "actions-kit/config" {
	import type { RollupOptions } from "rollup";

	interface ActionsKitConfig {
		rollup?: RollupOptions;
	}
}

export {};
