import cac, { type CAC, type Command } from "cac";

const cli = cac("actions-kit");

cli.command("build", "Build the project").action(() => {
	console.log("Building the project");
});

cli.parse();
