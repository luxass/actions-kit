import { z } from "zod";
import { ACTION_SCHEMA } from "@actions-kit/action-schema";
import { loadConfig as _loadConfig } from "c12";

const CONFIG_SCHEMA = z.object({
	/**
	 * Whether to write the action.yml file, should be updated based
	 * on the `action` field.
	 *
	 * @default false
	 */
	writeYaml: z.boolean().default(false),

	/**
	 * The GitHub Action configuration.
	 */
	action: ACTION_SCHEMA.optional(),

	/**
	 * Inject `inputs` and `outputs` into the global scope.
	 */
	inject: z.enum(["inputs", "outputs"]).or(z.literal(true)).default(true),

	/**
	 * The "builder" to use for building the action.
	 * @default "rspack"
	 */
	builder: z.enum(["esbuild", "rolldown", "rollup", "rspack", "vite", "webpack"]).default("rspack"),
});

export interface ActionsKitConfig extends z.input<typeof CONFIG_SCHEMA> {}

export function defineConfig(config: ActionsKitConfig): ActionsKitConfig {
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
