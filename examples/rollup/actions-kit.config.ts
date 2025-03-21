import { defineConfig } from "actions-kit/config";
import rollup from "@actions-sdk/rollup-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Rollup Example",
		description: "An Action built using Actions Kit with Rollup Builder",
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
			using: "node20",
			main: "dist/index.cjs",
		},
	},
	builder: rollup({}),
});
