import { existsSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import { createTsdownConfig } from "@actions-kit/tsdown-config";

export default createTsdownConfig({
  entry: [
    "./src/index.ts",
  ],
  format: "esm",
  async onSuccess() {
    if (existsSync("dist/templates")) {
      await rm("dist/templates", {
        recursive: true,
      });
    }

    await cp("templates", "dist/templates", {
      recursive: true,
    });
  },
});
