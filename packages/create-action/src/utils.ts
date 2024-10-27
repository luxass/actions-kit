import { lstatSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { green, blue } from "farver";
import { copyFile, mkdir, readdir } from "node:fs/promises";

export function isFolderEmpty(root: string, name: string): boolean {
	const validFiles = [
		".DS_Store",
		".git",
		".gitattributes",
		".gitignore",
		".gitlab-ci.yml",
		".hg",
		".hgcheck",
		".hgignore",
		".idea",
		".npmignore",
		".travis.yml",
		"LICENSE",
		"Thumbs.db",
		"docs",
		"mkdocs.yml",
		"npm-debug.log",
		"yarn-debug.log",
		"yarn-error.log",
		"yarnrc.yml",
		".yarn",
	];

	const conflicts = readdirSync(root).filter(
		(file) =>
			!validFiles.includes(file) &&
			// Support IntelliJ IDEA-based editors
			!/\.iml$/.test(file),
	);

	if (conflicts.length > 0) {
		console.log(`The directory ${green(name)} contains files that could conflict:`);
		console.log();
		for (const file of conflicts) {
			try {
				const stats = lstatSync(join(root, file));
				if (stats.isDirectory()) {
					console.log(`  ${blue(file)}/`);
				} else {
					console.log(`  ${file}`);
				}
			} catch {
				console.log(`  ${file}`);
			}
		}
		console.log();
		console.log("Either try using a new directory name, or remove the files listed above.");
		console.log();
		return false;
	}

	return true;
}

async function* getFilesGenerator(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const res = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* getFilesGenerator(res)
    } else {
      yield res
    }
  }
}

export async function getFiles(path: string): Promise<string[]> {
	const files: string[] = []
	for await (const file of getFilesGenerator(path)) {
		files.push(file)
	}
	return files
}
