---
title: Action
---

# Action


The `action` configuration is where you define the metadata for your action, such as its name, description, author, and more.

> [!IMPORTANT]
> For this to work best you will have to enable the `writeYaml` option in your configuration file.
> If not enabled you will have to manually create a `action.yml` file in the root of your action, and use that to define the metadata for your action.

## Properties

### `name`

The name of the action.

```yaml
name: "My Action"
```

### `description`

A short description of the action.

```yaml
description: "This is my action"
```

### `author`

The author of the action.

```yaml
author: "luxass"
```

### `branding`

The branding of the action.

#### `color`

The color of the action.

```yaml
branding:
  color: "purple"
```

#### `icon`

The icon of the action.

```yaml
branding:
  icon: "package"
```

### `inputs`

The inputs of the action.

```yaml
inputs:
  name:
    description: "Your name"
    required: true
    default: "World"
```

### `outputs`

The outputs of the action.

```yaml
outputs:
  greeting:
    description: "The greeting message"
```

### `runs`

The runs configuration of the action.

#### `using`

The runtime to use.

```yaml
runs:
  using: "node20"
```

#### `main`

The main file of the action.

```yaml

runs:
  main: "index.cjs"
```
