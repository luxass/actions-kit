import { defineConfig } from "actions-kit/config";
import webpack from "@actions-sdk/webpack-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Webpack Starter",
		description: "An Action built using Actions Kit with Webpack Builder",
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
	builder: webpack(),
});
