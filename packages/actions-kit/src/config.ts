import { z } from "zod";

export const CONFIG_SCHEMA = z.object({
	writeYaml: z.boolean(),
});

export type Config = z.infer<typeof CONFIG_SCHEMA>;

export function defineConfig(config: Config): Config {
	return config;
}
