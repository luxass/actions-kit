import webpack from "@actions-sdk/webpack-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  writeYaml: true,
  action: {
    name: "Actions Kit Webpack Example",
    description: "An Action built using Actions Kit with Webpack Builder",
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
  builder: webpack({}),
});
