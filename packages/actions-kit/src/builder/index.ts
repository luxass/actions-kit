import type { ActionsKitConfig } from "../config";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import Yaml from "yaml";

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

export async function overrideYaml(cwd: string, config: ActionsKitConfig): Promise<void> {
  if (!config?.writeYaml) {
    return;
  }

  const action = config.action;

  if (!action) {
    throw new Error("action is required.");
  }

  const order = ["name", "description", "author", "branding", "inputs", "outputs", "runs"];
  const actionYaml = Yaml.stringify(action, {
    sortMapEntries(a, b) {
      return order.indexOf(a.key as string) - order.indexOf(b.key as string);
    },
  });

  await writeFile(join(cwd, "action.yml"), actionYaml);
}
