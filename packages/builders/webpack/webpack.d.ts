declare module "actions-kit/config" {
	import type { Configuration } from "webpack";

	interface ActionsKitConfig {
		webpack?: Configuration;
	}
}

export {};
