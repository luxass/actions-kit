import { existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import process from "node:process";
import { isCancel, select, text } from "@clack/prompts";
import cac from "cac";
import { cyan, green } from "farver";
import { version } from "../package.json";
import { getFiles, isFolderEmpty } from "./utils";

const handleSigTerm = (): never => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const cli = cac("create-actions-kit");
cli.version(version);

cli
  .command("[directory]", "Create a new ActionsKit project")
  .option("--ts, --typescript", "Initialize as a TypeScript project. (default)")
  .option("--js, --javascript", "Initialize as a JavaScript project.")
  .option("--esbuild", "Use esbuild as the builder.")
  .option("--rolldown", "Use Rolldown as the builder.")
  .option("--rollup", "Use Rollup as the builder.")
  .option("--rspack", "Use Rspack as the builder.")
  .option("--vite", "Use Vite as the builder.")
  .option("--webpack", "Use Vite as the builder.")
  .action(async (directory, options) => {
    try {
      let projectPath = directory;
      if (typeof projectPath === "string") {
        projectPath = projectPath.trim();
      }

      if (!projectPath) {
        const result = await text({
          message: "What is your project named?",
          initialValue: "my-new-action",
        });

        if (isCancel(result)) {
          process.exit(0);
        }

        projectPath = result;
      }

      if (!projectPath) {
        console.error(
          "\nPlease specify the project directory:\n"
          + `  ${cyan(cli.name)} ${green("<project-directory>")}\n`
          + "For example:\n"
          + `  ${cyan(cli.name)} ${green("my-new-action")}\n\n`
          + `Run ${cyan(`${cli.name} --help`)} to see all options.`,
        );
        process.exit(1);
      }

      const appPath = resolve(projectPath);
      const appName = basename(appPath);
      if (existsSync(appPath) && !isFolderEmpty(appPath, appName)) {
        process.exit(1);
      }

      let builder = options.esbuild
        ? "esbuild"
        : options.rolldown
          ? "rolldown"
          : options.rollup
            ? "rollup"
            : options.rspack
              ? "rspack"
              : options.vite
                ? "vite"
                : options.webpack
                  ? "webpack"
                  : null;

      let language = null;
      if (options.js || options.javascript) {
        language = "js";
      } else if (options.ts || options.typescript) {
        language = "ts";
      }

      if (language == null) {
        const result = await select({
          message: "Which language do you want to use?",
          options: [
            {
              label: "TypeScript",
              value: "ts",
            },
            {
              label: "JavaScript",
              value: "js",
            },
          ],
          initialValue: "TypeScript",
        });

        if (isCancel(result)) {
          process.exit(0);
        }

        language = result;
      }

      if (builder == null) {
        const result = await select({
          message: "Which builder do you want to use?",
          options: [
            {
              label: "ESBuild",
              value: "esbuild",
            },
            {
              label: "Rolldown",
              value: "rolldown",
            },
            {
              label: "Rollup",
              value: "rollup",
            },
            {
              label: "Rspack",
              value: "rspack",
            },
            {
              label: "Vite",
              value: "vite",
            },
            {
              label: "Webpack",
              value: "webpack",
            },
          ],
          initialValue: "Rspack",
        });

        if (isCancel(result)) {
          process.exit(0);
        }

        builder = result;
      }

      const templateName = `with-${builder}`;

      if (!existsSync(join(import.meta.dirname, "./templates", templateName))) {
        console.error(
          `Could not locate the template: ${join(import.meta.dirname, "./templates", templateName)}`,
        );
        process.exit(1);
      }

      // eslint-disable-next-line no-console
      console.log(`using template: ${green(templateName)}`);

      const templatePath = join(import.meta.dirname, "./templates", templateName, language);

      if (!existsSync(projectPath)) {
        // eslint-disable-next-line no-console
        console.log(`Creating a new Actions Kit app in ${cyan(appPath)}`);
        await mkdir(appPath, { recursive: true });
      }

      // find all files in the template directory
      const files = await getFiles(templatePath);

      for (const file of files) {
        const relativePath = file.replace(`${templatePath}/`, "");
        let destPath = join(appPath, relativePath);

        if (relativePath.includes("/")) {
          const dir = destPath.split("/").slice(0, -1).join("/");
          await mkdir(dir, { recursive: true });
        }

        if (relativePath === "_gitignore") {
          destPath = destPath.replace("_gitignore", ".gitignore");
        }

        await copyFile(file, destPath);
      }

      const pkgUserAgent = process.env.npm_config_user_agent ?? "npm";

      const pkgManager = pkgUserAgent.startsWith("yarn")
        ? "yarn"
        : pkgUserAgent.startsWith("pnpm")
          ? "pnpm"
          : "npm";

      // eslint-disable-next-line no-console
      console.log("\nDone! 🎉\n");
      // eslint-disable-next-line no-console
      console.log("To get started, run:");
      // eslint-disable-next-line no-console
      console.log(`  cd ${cyan(appName)}`);
      // eslint-disable-next-line no-console
      console.log(`  ${pkgManager} install`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

cli.help();
cli.parse();
