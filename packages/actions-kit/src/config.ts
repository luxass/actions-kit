import { z } from "zod";
import { githubActionSchema } from "@actions-kit/action-schema";

const rspackSchema = z.object({
	config: z.string(), // rspack-specific field
});

const viteSchema = z.object({
	plugins: z.array(z.string()), // vite-specific field
});

const esbuildSchema = z.object({});

const CONFIG_SCHEMA = z
	.object({
		writeYaml: z.boolean(),
		action: githubActionSchema.optional(),
		builder: z.enum(["rspack", "vite", "esbuild"]).default("rspack").optional(),
		rspack: rspackSchema.optional(),
		vite: viteSchema.optional(),
		esbuild: esbuildSchema.optional(),
	})
	.refine(
		(data) => {
			if (data.builder === "rspack" && !data.rspack) {
				return false;
			}
			if (data.builder === "vite" && !data.vite) {
				return false;
			}
			if (data.builder === "esbuild" && !data.esbuild) {
				return false;
			}
			return true;
		},
		{
			message: "You must provide the corresponding configuration for the selected builder.",
		},
	);

export type Config = z.infer<typeof CONFIG_SCHEMA>;

export function defineConfig(config: Config): Config {
	return config;
}
