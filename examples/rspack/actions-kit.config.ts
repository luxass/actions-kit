import rspack from "@actions-sdk/rspack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  writeYaml: true,
  action: {
    name: "Actions Kit Rspack Example",
    description: "An Action built using Actions Kit with Rspack Builder",
    author: "luxass",
    branding: {
      color: "purple",
      icon: "package",
    },
    inputs: {
      name: {
        description: "Your name",
        required: true,
        default: "World",
      },
    },
    runs: {
      using: "node24",
      main: "dist/index.cjs",
    },
  },
  builder: rspack({}),
});
