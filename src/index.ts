import type { InputOptions } from "@actions/core";
import type { SafeParseReturnType, ZodType } from "zod";
import { getInput } from "@actions/core";

/**
 * Retrieves an input value by its name, validates it against a provided Zod schema using safeParse, and returns the result of the validation.
 *
 * @template TSchema - The Zod schema type used for validation.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {TSchema} schema - The Zod schema to validate the input against.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {SafeParseReturnType<unknown, TSchema["_output"]>} The result of the validation, containing either the parsed value or validation errors.
 */
export function getSafeValidatedInput<TSchema extends ZodType>(
    inputName: string,
    schema: TSchema,
    options?: InputOptions,
): SafeParseReturnType<unknown, TSchema["_output"]> {
    const raw = getInput(inputName, options);

    return schema.safeParse(raw);
}

/**
 * Retrieves an input value by its name, validates it against a provided Zod schema using parse, and returns the parsed value.
 *
 * @template TSchema - The Zod schema type used for validation.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {TSchema} schema - The Zod schema to validate the input against.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {TSchema["_output"]} The parsed value.
 * @throws {Error} If the validation fails.
 */
export function getValidatedInput<TSchema extends ZodType>(
    inputName: string,
    schema: TSchema,
    options?: InputOptions,
): TSchema["_output"] {
    const raw = getInput(inputName, options);

    return schema.parse(raw);
}

/**
 * Retrieves an input value by its name, validates it against a provided Zod schema using safeParseAsync, and returns the result of the validation.
 *
 * @template TSchema - The Zod schema type used for validation.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {TSchema} schema - The Zod schema to validate the input against.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {Promise<SafeParseReturnType<unknown, TSchema["_output"]>>} The result of the validation, containing either the parsed value or validation errors.
 */
export async function getSafeValidatedInputAsync<TSchema extends ZodType>(
    inputName: string,
    schema: TSchema,
    options?: InputOptions,
): Promise<SafeParseReturnType<unknown, TSchema["_output"]>> {
    const raw = getInput(inputName, options);

    return schema.safeParseAsync(raw);
}

/**
 * Retrieves an input value by its name, validates it against a provided Zod schema using parseAsync, and returns the parsed value.
 *
 * @template TSchema - The Zod schema type used for validation.
 * @param {string} inputName - The name of the input to retrieve.
 * @param {TSchema} schema - The Zod schema to validate the input against.
 * @param {InputOptions} [options] - Optional settings for retrieving the input.
 * @returns {Promise<TSchema["_output"]>} The parsed value.
 * @throws {Error} If the validation fails.
 */
export async function getValidatedInputAsync<TSchema extends ZodType>(
    inputName: string,
    schema: TSchema,
    options?: InputOptions,
): Promise<TSchema["_output"]> {
    const raw = getInput(inputName, options);

    return schema.parseAsync(raw);
}
