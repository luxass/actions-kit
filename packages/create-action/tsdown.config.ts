import { createTsdownConfig } from "@actions-kit/tsdown-config";
import { existsSync } from "node:fs";
import { rm, cp } from "node:fs/promises";

export default createTsdownConfig({
  entry: [
    "./src/**/*.ts",
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
