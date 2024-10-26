export interface ActionsKitOptions {
	/**
	 * The path to the action.yml or action.yaml file.
	 * If not provided, it will look for action.yml or action.yaml in the root directory.
	 */
	actionPath?: string;

	/**
	 * Inject `inputs` and `outputs` into the global scope.
	 * @default false
	 */
	inject?: boolean | "inputs" | "outputs";

	/**
	 * Enable Autocomplete
	 * @default true
	 *
	 * NOTE:
	 * This will overload some functions of `@actions/core`, to provide better code-completion.
	 */
	autocomplete?: boolean;

	/**
	 * The output path for the generated typescript file.
	 * If not provided, it will use the directory where the action.yml or action.yaml file is located.
	 */
	outputPath?: string;
}
