import * as core from "@actions/core";

async function run() {
	core.info("Hello, World!");
}

run().catch((err) => {
	core.setFailed(err);
});
