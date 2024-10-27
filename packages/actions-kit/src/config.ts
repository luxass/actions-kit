import { z } from "zod";
import { ACTION_SCHEMA } from "@actions-sdk/action-schema";
import { loadConfig as _loadConfig } from "c12";

const BASE_CONFIG_SCHEMA = z.object({
	/**
	 * Whether to write the action.yml file, should be updated based
	 * on the `action` field.
	 *
	 * @default false
	 */
	writeYaml: z.boolean().default(false),

	/**
	 * The "build" configuration for the project.
	 * @default {input:"./src/index.ts"}
	 */
	build: z
		.object({
			input: z.string().optional().default("./src/index.ts"),
			// TODO: add more here
		})
		.optional(),

	/**
	 * The GitHub Action configuration.
	 */
	action: ACTION_SCHEMA.optional(),

	/**
	 * Inject `inputs` and `outputs` into the global scope.
	 */
	inject: z.enum(["inputs", "outputs"]).or(z.literal(true)).default(true),

	/**
	 * Enable Autocomplete
	 * @default true
	 */
	autocomplete: z.boolean().default(true),
});

export type BaseActionsKitConfig = z.input<typeof BASE_CONFIG_SCHEMA>;

const CONFIG_SCHEMA = BASE_CONFIG_SCHEMA.extend({
	builder: z
		.object({
			name: z.string(),
			build: z
				.function()
				.args(
					z.object({
						cwd: z.string(),
						config: z.custom<BaseActionsKitConfig>(),
					}),
				)
				.returns(z.any()),
		})
		.optional(),
});

export type ActionsKitConfig = z.input<typeof CONFIG_SCHEMA>;

/**
 * Defines and returns an ActionsKit configuration.
 *
 * @param {ActionsKitConfig} config - The configuration object for ActionsKit.
 * @returns {ActionsKitConfig} The provided configuration object.
 */
export function defineConfig(config: ActionsKitConfig): ActionsKitConfig {
	return config;
}

/**
 * Loads the configuration for the actions-kit package.
 *
 * @param {string} [cwd=process.cwd()] - The current working directory from which to load the configuration.
 * @param {string} [configFile] - Optional path to a specific configuration file. Defaults to "actions-kit.config.ts".
 * @returns {Promise<ActionsKitConfig>} - A promise that resolves to the parsed configuration object.
 */
export async function loadConfig(
	cwd: string = process.cwd(),
	configFile?: string,
): Promise<ActionsKitConfig> {
	const result = await _loadConfig({
		cwd,
		dotenv: false,
		rcFile: false,
		globalRc: false,
		packageJson: false,
		configFile: configFile || "actions-kit.config.ts",
	});

	return CONFIG_SCHEMA.parse(result.config ?? {});
}
