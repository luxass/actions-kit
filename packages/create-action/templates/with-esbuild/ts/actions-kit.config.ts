import { defineConfig } from "actions-kit/config";
import esbuild from "@actions-sdk/esbuild-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit ESBuild Starter",
		description: "An Action built using Actions Kit with ESBuild Builder",
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
	builder: esbuild(),
});
