import { z } from "zod";
import { ACTION_SCHEMA } from "@actions-kit/action-schema";
import type { RspackConfig, ViteConfig } from "@actions-kit/builder"

const CONFIG_SCHEMA = z
	.object({
		writeYaml: z.boolean(),
		action: ACTION_SCHEMA.optional(),
		builder: z.enum(["rspack", "vite"]).default("rspack").optional(),
	})

export type Config = z.infer<typeof CONFIG_SCHEMA> & {
	rspack?: RspackConfig
	vite?: ViteConfig
}

export function defineConfig(config: Config): Config {
	return config;
}
