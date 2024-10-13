/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { createVitePlugin } from "unplugin";
import type unplugin from "./";
import { unpluginFactory } from "./";

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import actionsKit from "actions-kit/unplugin//vite"
 *
 * export default defineConfig({
 *   plugins: [actionsKit()],
 * })
 * ```
 */
export default createVitePlugin(unpluginFactory) as typeof unplugin.vite;
