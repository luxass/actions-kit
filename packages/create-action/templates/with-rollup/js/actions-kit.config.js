import { defineConfig } from "actions-kit/config";
import rollup from "@actions-sdk/rollup-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Rollup Starter",
		description: "An Action built using Actions Kit with Rollup Builder",
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
	builder: rollup(),
});
