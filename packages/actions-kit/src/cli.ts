import cac, { type CAC, type Command } from "cac";
import { loadConfig } from "@actions-kit/config";
const cli = cac("actions-kit");

cli
	.command("build", "Build the project")
	.option("--cwd <cwd>", "The working directory", {
		default: process.cwd(),
	})
	.option("--config <config>", "The configuration file")
	.action(async (args) => {
		try {
			// load configuration file.
			const config = await loadConfig(args.cwd, args.config);

			const builder = await import("./builder").then((mod) => mod);

			await builder.build(args.cwd, config);
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	});

cli.parse();
