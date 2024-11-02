import cac from "cac";
import { loadConfig } from "./config";
import { overrideYaml } from "./builder";
import { blue, green, yellow } from "farver";

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

			// TODO: detect use of `action.yml` vs `action.yaml`

			if (config.builder == null) {
				// todo: fix output
				throw new Error("No builder found in the configuration file");
			}

			const builder = config.builder;
			console.log(`using ${blue(builder.name)}`);

			await overrideYaml(args.cwd, config);

			const startTime = performance.now();

			const outputs = await builder.build({
				cwd: args.cwd,
				config: config,
			});

			const buildTime = Math.round(performance.now() - startTime);


			console.info("Build details:");
			if (config.writeYaml) {
				console.info(`  - ${blue("action.yml")}`);
			}
			for (const file of outputs) {
				console.info(`  - ${blue(file.name)} (${yellow(`${(file.size / 1024).toFixed(2)} KB`)}) (${yellow(file.size)} bytes)`);
			}
			console.info(`\nBuild completed successfully in ${green(`${buildTime}ms`)}`);
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	});

cli.parse();
