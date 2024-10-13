import type { InputOptions } from "@actions/core";
import type { ZodType } from "zod";
import { getInput } from "@actions/core";

export function getValidatedInput<TSchema extends ZodType>(inputName: string, schema: TSchema, options?: InputOptions): TSchema["_output"] {
  const raw = getInput(inputName, options);

  return schema.safeParse(raw);
}
