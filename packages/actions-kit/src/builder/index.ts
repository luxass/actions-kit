import { build as buildRspack } from "./rspack";
import { build as buildVite } from "./vite";
import type { Config } from "../config";
import consola from "consola";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import Yaml from "js-yaml";

export async function build(cwd: string, config: Config) {
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

	consola.info(`building with ${config.builder}...`);
	if (config.builder === "rspack") {
		return buildRspack(config);
	}

	if (config.builder === "vite") {
		return buildVite(config);
	}

	if (config.builder === "esbuild") {
		throw new Error("esbuild builder is not implemented yet.");
	}

	if (config.builder === "rolldown") {
		throw new Error("rolldown builder is not implemented yet.");
	}

	if (config.builder === "rollup") {
		throw new Error("rollup builder is not implemented yet.");
	}

	if (config.builder === "webpack") {
		throw new Error("webpack builder is not implemented yet.");
	}

	throw new Error(`Unknown builder: ${config.builder}`);
}
