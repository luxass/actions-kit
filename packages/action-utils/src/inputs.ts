import type { InputOptions } from "@actions/core";
import { getInput } from "@actions/core";

type ValidatorFunction<T> = (data: unknown) => T;

type InferValidatorReturn<T> = T extends (data: unknown) => infer R ? R : never;

/**
 * Retrieves an input value, validates it using the provided validator function, and returns the validated value.
 *
 * @template T - The type of the validator function.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {T} validatorFn - The function used to validate the input value.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {InferValidatorReturn<T>} - The validated input value.
 */
// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any parame
export function getValidatedInput<T extends ValidatorFunction<any>>(
	inputName: string,
	validatorFn: T,
	options?: InputOptions,
): InferValidatorReturn<T> {
	const raw = getInput(inputName, options);

	return validatorFn(raw);
}
