import { join } from "node:path";
import { readFile } from "node:fs/promises";
import Yaml from "js-yaml";
import { ACTION_SCHEMA, type Action } from "@actions-sdk/action-schema";
import type { ActionsKitConfig } from "../config";

export async function inferOutputFilename(config: ActionsKitConfig): Promise<string> {
	if (
		config.action != null &&
		config.writeYaml &&
		config.action?.runs.using !== "composite" &&
		config.action?.runs.using !== "docker"
	) {
		return config.action.runs.main;
	}

	const actionYmlPath = join(process.cwd(), "action.yml");
	const actionYamlPath = join(process.cwd(), "action.yaml");
	const actionYml = await readYaml(actionYmlPath);
	if (actionYml != null) {
		if (actionYml.runs.using === "composite" || actionYml.runs.using === "docker") {
			throw new Error(`The action file at ${actionYmlPath} is not a JavaScript action`);
		}
		return actionYml.runs.main as string;
	}

	const actionYaml = await readYaml(actionYamlPath);
	if (actionYaml != null) {
		if (actionYaml.runs.using === "composite" || actionYaml.runs.using === "docker") {
			throw new Error(`The action file at ${actionYamlPath} is not a JavaScript action`);
		}
		return actionYaml.runs.main as string;
	}

	throw new Error(`No action file found at ${actionYmlPath} or ${actionYamlPath}`);
}

async function readYaml(path: string): Promise<Action | null> {
	try {
		const content = await readFile(path, "utf8");

		const yaml = Yaml.load(content);

		const action = await ACTION_SCHEMA.parseAsync(yaml);
		return action;
	} catch (err) {
		if (err instanceof Yaml.YAMLException) {
			throw new Error(`Error parsing ${path}: ${err.message}`);
		}
		return null;
	}
}

export async function inferModuleType(
	config: ActionsKitConfig,
	outputFileName: string,
): Promise<"esm" | "cjs"> {
	if (outputFileName.endsWith(".cjs")) return "cjs";
	if (outputFileName.endsWith(".mjs")) return "esm";
	return "cjs";
}
