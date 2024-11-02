# Getting Started

Actions Kit is a "toolkit" for GitHub Actions. It provides a set of utilities and helpers to make it easier to build powerful actions.

## Create a new project

To create a new project, you can use the `create-actions-kit` CLI. This CLI will create a new project with the necessary files and directories to get you started.

::: code-group

```bash [pnpm]
pnpm create actions-kit
```

```bash [yarn]
yarn create actions-kit
```

```bash [npm]
npx create-actions-kit
```

```bash [bun]
bun create actions-kit
```

:::

Or if you want to add it to an existing project, you can install it using the following command:

::: code-group

```bash [npm]
npm install actions-kit
```

```bash [pnpm]
pnpm add actions-kit
```

```bash [yarn]
yarn add actions-kit
```

```bash [bun]
bun install actions-kit
```

:::

And then install the necessary [builder](../builders/overview.md) you want to use.
