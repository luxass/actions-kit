import type { ActionsKitConfig } from "../config";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import Yaml from "js-yaml";

export function defineBuilder(builder: Builder): Builder {
  return builder;
}

export interface BuildOutput {
  name: string;
  path: string;
  size: number;
}

export interface Builder {
  name: string;
  build: (options: BuildOptions) => Promise<BuildOutput[]>;
}

export interface BuildOptions {
  cwd: string;
  config: ActionsKitConfig;
}

export async function overrideYaml(cwd: string, config: ActionsKitConfig) {
  if (!config?.writeYaml) {
    return;
  }

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
