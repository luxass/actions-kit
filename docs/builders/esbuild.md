# ESBuild Builder

Build GitHub Actions using ESBuild.

## Installation

::: code-group

```bash [pnpm]
pnpm add -D actions-kit @actions-sdk/esbuild-builder
```

```bash [yarn]
yarn add -D actions-kit @actions-sdk/esbuild-builder
```

```bash [npm]
npm install -D actions-kit @actions-sdk/esbuild-builder
```

```bash [bun]
bun install -D actions-kit @actions-sdk/esbuild-builder
```

:::

Set the `builder` in your `actions-kit.config.ts` file:

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import esbuild from "@actions-sdk/esbuild-builder";

export default defineConfig({
  builder: esbuild({
    ...esbuildOptions,
  }),
});
```

### Customizing ESBuild

You can customize the ESBuild options by passing the options directly into the `esbuild` function.

> [!NOTE]
> Not all of ESBuild's options are supported. For a list of the supported options, see [ESBuild Options](#esbuild-options).

```ts [actions-kit.config.ts]
import { defineConfig } from "actions-kit/config";
import esbuild from "@actions-sdk/esbuild-builder";

export default defineConfig({
  builder: esbuild({
    target: "esnext",
    format: "esm",
    minify: true,
  }),
});
```

## ESBuild Options

These are the supported ESBuild options:

| Option            | Type                                                                  | Documentation                                                           |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| sourcemap         | `boolean \| 'linked' \| 'inline' \| 'external' \| 'both'`             | [Source Map](https://esbuild.github.io/api/#sourcemap)                  |
| legalComments     | `'none' \| 'inline' \| 'eof' \| 'linked' \| 'external'`               | [Legal Comments](https://esbuild.github.io/api/#legal-comments)         |
| sourceRoot        | `string`                                                              | [Source Root](https://esbuild.github.io/api/#source-root)               |
| sourcesContent    | `boolean`                                                             | [Sources Content](https://esbuild.github.io/api/#sources-content)       |
| format            | `'iife' \| 'cjs' \| 'esm'`                                            | [Format](https://esbuild.github.io/api/#format)                         |
| globalName        | `string`                                                              | [Global Name](https://esbuild.github.io/api/#global-name)               |
| target            | `string \| string[]`                                                  | [Target](https://esbuild.github.io/api/#target)                         |
| supported         | `Record<string, boolean>`                                             | [Supported](https://esbuild.github.io/api/#supported)                   |
| platform          | `'browser' \| 'node' \| 'neutral'`                                    | [Platform](https://esbuild.github.io/api/#platform)                     |
| mangleProps       | `RegExp`                                                              | [Mangle Props](https://esbuild.github.io/api/#mangle-props)             |
| reserveProps      | `RegExp`                                                              | [Mangle Props](https://esbuild.github.io/api/#mangle-props)             |
| mangleQuoted      | `boolean`                                                             | [Mangle Props](https://esbuild.github.io/api/#mangle-props)             |
| mangleCache       | `Record<string, string \| false>`                                     | [Mangle Props](https://esbuild.github.io/api/#mangle-props)             |
| drop              | `('console' \| 'debugger')[]`                                         | [Drop](https://esbuild.github.io/api/#drop)                             |
| dropLabels        | `string[]`                                                            | [Drop Labels](https://esbuild.github.io/api/#drop-labels)               |
| minify            | `boolean`                                                             | [Minify](https://esbuild.github.io/api/#minify)                         |
| minifyWhitespace  | `boolean`                                                             | [Minify](https://esbuild.github.io/api/#minify)                         |
| minifyIdentifiers | `boolean`                                                             | [Minify](https://esbuild.github.io/api/#minify)                         |
| minifySyntax      | `boolean`                                                             | [Minify](https://esbuild.github.io/api/#minify)                         |
| lineLimit         | `number`                                                              | [Line Limit](https://esbuild.github.io/api/#line-limit)                 |
| charset           | `'ascii' \| 'utf8'`                                                   | [Charset](https://esbuild.github.io/api/#charset)                       |
| treeShaking       | `boolean`                                                             | [Tree Shaking](https://esbuild.github.io/api/#tree-shaking)             |
| ignoreAnnotations | `boolean`                                                             | [Ignore Annotations](https://esbuild.github.io/api/#ignore-annotations) |
| jsx               | `'transform' \| 'preserve' \| 'automatic'`                            | [JSX](https://esbuild.github.io/api/#jsx)                               |
| jsxFactory        | `string`                                                              | [JSX Factory](https://esbuild.github.io/api/#jsx-factory)               |
| jsxFragment       | `string`                                                              | [JSX Fragment](https://esbuild.github.io/api/#jsx-fragment)             |
| jsxImportSource   | `string`                                                              | [JSX Import Source](https://esbuild.github.io/api/#jsx-import-source)   |
| jsxDev            | `boolean`                                                             | [JSX Development](https://esbuild.github.io/api/#jsx-development)       |
| jsxSideEffects    | `boolean`                                                             | [JSX Side Effects](https://esbuild.github.io/api/#jsx-side-effects)     |
| define            | `{ [key: string]: string }`                                           | [Define](https://esbuild.github.io/api/#define)                         |
| pure              | `string[]`                                                            | [Pure](https://esbuild.github.io/api/#pure)                             |
| keepNames         | `boolean`                                                             | [Keep Names](https://esbuild.github.io/api/#keep-names)                 |
| color             | `boolean`                                                             | [Color](https://esbuild.github.io/api/#color)                           |
| logLevel          | `'verbose' \| 'debug' \| 'info' \| 'warning' \| 'error' \| 'silent'`  | [Log Level](https://esbuild.github.io/api/#log-level)                   |
| logLimit          | `number`                                                              | [Log Limit](https://esbuild.github.io/api/#log-limit)                   |
| logOverride       | `Record<string, LogLevel>`                                            | [Log Override](https://esbuild.github.io/api/#log-override)             |
| bundle            | `boolean`                                                             | [Bundle](https://esbuild.github.io/api/#bundle)                         |
| splitting         | `boolean`                                                             | [Splitting](https://esbuild.github.io/api/#splitting)                   |
| preserveSymlinks  | `boolean`                                                             | [Preserve Symlinks](https://esbuild.github.io/api/#preserve-symlinks)   |
| outfile           | `string`                                                              | [Outfile](https://esbuild.github.io/api/#outfile)                       |
| metafile          | `boolean`                                                             | [Metafile](https://esbuild.github.io/api/#metafile)                     |
| outdir            | `string`                                                              | [Outdir](https://esbuild.github.io/api/#outdir)                         |
| outbase           | `string`                                                              | [Outbase](https://esbuild.github.io/api/#outbase)                       |
| external          | `string[]`                                                            | [External](https://esbuild.github.io/api/#external)                     |
| packages          | `'bundle' \| 'external'`                                              | [Packages](https://esbuild.github.io/api/#packages)                     |
| alias             | `Record<string, string>`                                              | [Alias](https://esbuild.github.io/api/#alias)                           |
| loader            | `{ [ext: string]: Loader }`                                           | [Loader](https://esbuild.github.io/api/#loader)                         |
| resolveExtensions | `string[]`                                                            | [Resolve Extensions](https://esbuild.github.io/api/#resolve-extensions) |
| mainFields        | `string[]`                                                            | [Main Fields](https://esbuild.github.io/api/#main-fields)               |
| conditions        | `string[]`                                                            | [Conditions](https://esbuild.github.io/api/#conditions)                 |
| write             | `boolean`                                                             | [Write](https://esbuild.github.io/api/#write)                           |
| allowOverwrite    | `boolean`                                                             | [Allow Overwrite](https://esbuild.github.io/api/#allow-overwrite)       |
| tsconfig          | `string`                                                              | [TSConfig](https://esbuild.github.io/api/#tsconfig)                     |
| outExtension      | `{ [ext: string]: string }`                                           | [Out Extension](https://esbuild.github.io/api/#out-extension)           |
| publicPath        | `string`                                                              | [Public Path](https://esbuild.github.io/api/#public-path)               |
| entryNames        | `string`                                                              | [Entry Names](https://esbuild.github.io/api/#entry-names)               |
| chunkNames        | `string`                                                              | [Chunk Names](https://esbuild.github.io/api/#chunk-names)               |
| assetNames        | `string`                                                              | [Asset Names](https://esbuild.github.io/api/#asset-names)               |
| inject            | `string[]`                                                            | [Inject](https://esbuild.github.io/api/#inject)                         |
| banner            | `{ [type: string]: string }`                                          | [Banner](https://esbuild.github.io/api/#banner)                         |
| footer            | `{ [type: string]: string }`                                          | [Footer](https://esbuild.github.io/api/#footer)                         |
| entryPoints       | `string[] \| Record<string, string> \| { in: string, out: string }[]` | [Entry Points](https://esbuild.github.io/api/#entry-points)             |
| plugins           | `Plugin[]`                                                            | [Plugins](https://esbuild.github.io/plugins/)                           |
| absWorkingDir     | `string`                                                              | [Working Directory](https://esbuild.github.io/api/#working-directory)   |
| nodePaths         | `string[]`                                                            | [Node Paths](https://esbuild.github.io/api/#node-paths)                 |
