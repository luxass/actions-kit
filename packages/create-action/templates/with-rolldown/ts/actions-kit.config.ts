import { defineConfig } from "actions-kit/config";
import rolldown from "@actions-sdk/rolldown-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Rolldown Starter",
		description: "An Action built using Actions Kit with Rolldown Builder",
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
	builder: rolldown(),
});
