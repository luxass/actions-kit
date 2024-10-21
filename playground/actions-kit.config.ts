import { defineConfig } from "actions-kit/config";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Playground 2",
		description: "An Action built using Actions Kit",
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
			main: "index.js",
		},
	},
});
