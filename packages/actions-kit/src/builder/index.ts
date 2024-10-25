import type { ActionsKitConfig } from "../config";
import consola from "consola";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import Yaml from "js-yaml";
import { inferOutputFilename, inferModuleType } from "../utils";

export async function build(cwd: string, config: ActionsKitConfig) {
	if (config?.writeYaml) {
		consola.info("writing action.yml...");
		const action = config.action;

		if (!action) {
			throw new Error("action is required.");
		}

		const actionYaml = Yaml.dump(action, {
			sortKeys(a, b) {
				const order = ["name", "description", "author", "branding", "inputs", "outputs", "runs"];
				return order.indexOf(a) - order.indexOf(b);
			},
		});
		await writeFile(join(cwd, "action.yml"), actionYaml);
	}

	// TODO: fail if builder is not installed, with a pretty error message :)!

	consola.info(`building with ${config.builder}...`);

	const outputFileName = await inferOutputFilename(config);
	const libraryType = await inferModuleType(config, outputFileName);

	const options = {
		config,
		cwd,
		libraryType,
		outputFileName,
	};

	if (config.builder === "rspack") {
		const { build } = await import("@actions-kit/rspack-builder").then((m) => m);

		return build(options);
	}

	if (config.builder === "vite") {
		const { build } = await import("@actions-kit/vite-builder").then((m) => m);

		return build(options);
	}

	if (config.builder === "esbuild") {
		const { build } = await import("@actions-kit/esbuild-builder").then((m) => m);

		return build(options);
	}

	if (config.builder === "rolldown") {
		const { build } = await import("@actions-kit/rolldown-builder").then((m) => m);

		return build(options);
	}

	if (config.builder === "rollup") {
		const { build } = await import("@actions-kit/rollup-builder").then((m) => m);

		return build(options);
	}

	if (config.builder === "webpack") {
		const { build } = await import("@actions-kit/webpack-builder").then((m) => m);

		return build(options);
	}

	throw new Error(`Unknown builder: ${config.builder}`);
}
