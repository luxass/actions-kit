import core from "@actions/core";
import { defineAction } from "actions-kit"

defineAction(({
  inputs,
  outputs
}) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const name = core.getInput(inputs.name!);

})
