import { createTsdownConfig } from "@actions-kit/tsdown-config";

export default createTsdownConfig({
  entry: [
    "./src/index.ts",
  ],
});
