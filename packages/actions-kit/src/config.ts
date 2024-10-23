import { z } from "zod";
import { ACTION_SCHEMA } from "@actions-kit/action-schema";
import type { Configuration as RspackConfig } from "@rspack/core";
import type { UserConfig as ViteConfig } from "vite";
import { loadConfig as _loadConfig } from "c12";

const CONFIG_SCHEMA = z.object({
	writeYaml: z.boolean().default(false),
	action: ACTION_SCHEMA.optional(),
	builder: z.enum(["esbuild", "rolldown", "rollup", "rspack", "vite", "webpack"]).default("rspack"),
});

export type Config = z.input<typeof CONFIG_SCHEMA> & {
	rspack?: Pick<RspackConfig, "plugins">;
	vite?: Pick<ViteConfig, "plugins">;
};

export function defineConfig(config: Config): Config {
	return config;
}

export async function loadConfig(cwd = process.cwd(), configFile?: string) {
	const result = await _loadConfig({
		cwd,
		dotenv: false,
		rcFile: false,
		globalRc: false,
		packageJson: false,
		configFile: configFile || "actions-kit.config.ts",
	});

	return CONFIG_SCHEMA.parse(result.config);
}
