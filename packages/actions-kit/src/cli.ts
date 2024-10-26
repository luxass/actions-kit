import cac from "cac";
import { loadConfig } from "./config";
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
			console.log(config);
			if (config.builder == null) {
				// todo: fix output
				throw new Error("No builder found in the configuration file");
			}

			const builder = config.builder;
			console.log("using builder", builder.name);

			const output = await builder.build({
				cwd: args.cwd,
				config: config,
			});

			console.log(output);
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	});

cli.parse();
