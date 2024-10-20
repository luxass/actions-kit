import cac, { type CAC, type Command } from "cac";

const cli = cac("actions-kit");

cli
	.command("build", "Build the project")
	.option("--cwd <cwd>", "The working directory")
	.option("--config <config>", "The configuration file")
	.action(async (args) => {
		try {
			const builder = await import("./build").then((mod) => mod);

			await builder.build(args);
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	});

cli.parse();
