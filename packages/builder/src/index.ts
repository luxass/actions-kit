import type { Configuration as RspackConfig } from "@rspack/core";
import type { UserConfig as ViteConfig } from "vite";

import { build as buildRspack } from "./rspack";
import { build as buildVite } from "./vite";

export async function build(builder: "rspack" | "vite", config: RspackConfig | ViteConfig) {
  if (builder === "rspack") {
    return buildRspack(config as RspackConfig);
  }

  if (builder === "vite") {
    return buildVite(config as ViteConfig);
  }

  throw new Error(`Unknown builder: ${builder}`);
}

export { buildRspack, buildVite };
export type { RspackConfig, ViteConfig };
