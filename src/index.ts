import type { InputOptions } from "@actions/core";
import type { SafeParseReturnType, ZodType } from "zod";
import { getInput } from "@actions/core";

/**
 * Retrieves an input value by its name, validates it against a provided Zod schema, and returns the result of the validation.
 *
 * @template TSchema - The Zod schema type used for validation.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {TSchema} schema - The Zod schema to validate the input against.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {SafeParseReturnType<unknown, TSchema["_output"]>} The result of the validation, containing either the parsed value or validation errors.
 */
export function getValidatedInput<TSchema extends ZodType>(
	inputName: string,
	schema: TSchema,
	options?: InputOptions,
): SafeParseReturnType<unknown, TSchema["_output"]> {
	const raw = getInput(inputName, options);

	return schema.safeParse(raw);
}
