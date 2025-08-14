import vite from "@actions-sdk/vite-builder";
import { defineConfig } from "actions-kit/config";

export default defineConfig({
  writeYaml: true,
  action: {
    name: "Actions Kit Vite Starter",
    description: "An Action built using Actions Kit with Vite Builder",
    author: "insert your name here",
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
      using: "node20",
      main: "index.cjs",
    },
  },
  builder: vite(),
});
