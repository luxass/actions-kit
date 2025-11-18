import { existsSync, readdirSync, readFileSync } from "node:fs";
import { defineConfig, type TestProjectConfiguration } from "vitest/config";

const root = new URL("./", import.meta.url).pathname;

const pkgRoot = (pkg: string) =>
  new URL(`./packages/${pkg}`, import.meta.url).pathname;
const alias = (pkg: string) => `${pkgRoot(pkg)}/src`;


const rootPackages = readdirSync(new URL("./packages", import.meta.url).pathname);
const builderPackages = readdirSync(new URL("./packages/builders", import.meta.url).pathname);

const packages = [
  ...rootPackages.filter((dir) => existsSync(pkgRoot(dir) + "/package.json")),
  ...builderPackages.filter((dir) => existsSync(pkgRoot("builders/" + dir) + "/package.json"))
];

const nonPrefixedPackages = [
  "actions-kit",
  "unplugin-actions-kit",
  "unplugin-actions-kit/*",
]

const isBuilderPackage = (pkg: string) => builderPackages.includes(pkg);

const aliases = packages
  .reduce<Record<string, string>>(
    (acc, pkg) => {
      if (nonPrefixedPackages.includes(pkg)) {
        acc[pkg] = alias(pkg);
        return acc;
      }

      if (isBuilderPackage(pkg)) {
        acc[`@actions-sdk/${pkg}-builder`] = alias("builders/" + pkg);
        return acc;
      }

      acc[`@actions-sdk/${pkg}`] = alias(pkg);
      return acc;
    }, {});

const hiddenLogs: string[] = []

const packageProjects = packages
  .map((dir) => {
    return {
      extends: true,
      test: {
        include: [`./packages/${dir}/**/*.{test,spec}.?(c|m)[jt]s?(x)`],
        name: dir,
      }
    } satisfies TestProjectConfiguration;
  });


export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["**/src/**"],
      exclude: [
        "tooling/*"
      ]
    },
    environment: "node",
    mockReset: true,
    onConsoleLog(log, type) {
      if (type === "stderr") {
        return !hiddenLogs.some((hidden) => log.includes(hidden));
      }

      return false;
    },
    projects: [
      ...packageProjects,
    ]
  },
  esbuild: { target: "es2020" },
  resolve: { alias: aliases },
})
