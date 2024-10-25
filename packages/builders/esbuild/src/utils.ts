import type { BuildOptions as ESBuildBuildOptions } from "esbuild";

export function getESBuildEntryPoint(
	entryPoints: ESBuildBuildOptions["entryPoints"],
	defaultEntryPoint: string,
): string {
	if (Array.isArray(entryPoints)) {
		if (entryPoints.length > 1) {
			throw new Error("Only one entry point is allowed");
		}

		if (entryPoints[0] != null && typeof entryPoints[0] !== "string") {
			return entryPoints[0].in;
		}

		return entryPoints[0] ?? defaultEntryPoint;
	}

	if (entryPoints != null && typeof entryPoints === "object") {
		if (!("index" in entryPoints)) {
			// TODO: add code page here point to docs
			throw new Error(
				"You have specified entryPoints as an object, but could not find index entry.",
			);
		}

		return entryPoints.index;
	}

	return defaultEntryPoint;
}
