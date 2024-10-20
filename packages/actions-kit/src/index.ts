import process from "node:process";
import * as core from "@actions/core";

export type ActionCtx = {
	inputs: Record<string, string>;
	outputs: Record<string, string>;
};

export async function defineAction(action: (args: ActionCtx) => void | Promise<void>) {
	try {
		await action({
			// TODO: use real values
			inputs: {},
			outputs: {},
		});
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		} else {
			core.setFailed("An unexpected error occurred");
		}
		process.exit(1);
	}
}
