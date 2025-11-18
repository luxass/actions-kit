import esbuild from "@actions-sdk/esbuild-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  writeYaml: true,
  action: {
    name: "Actions Kit ESBuild Example",
    description: "An Action built using Actions Kit with ESBuild Builder",
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
  builder: esbuild({
    format: "cjs",
  }),
});
