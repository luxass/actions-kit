import { defineConfig } from "actions-kit/config";
import rspack from "@actions-sdk/rspack-builder";

export default defineConfig({
	writeYaml: true,
	action: {
		name: "Actions Kit Rspack Starter",
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
			using: "node20",
			main: "index.cjs",
		},
	},
	builder: rspack(),
});
