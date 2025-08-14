import { z } from "zod";

export const EXPRESSION_SYNTAX_SCHEMA = z
  .string()
  .regex(/^\$\{\{(.|[\r\n])*\}\}$/)
  .describe("A string that matches the expression syntax pattern");

export type ExpressionSyntax = z.infer<typeof EXPRESSION_SYNTAX_SCHEMA>;

export const STRING_CONTAINING_EXPRESSION_SYNTAX_SCHEMA = z
  .string()
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  .regex(/^.*\$\{\{(.|[\r\n])*\}\}.*$/)
  .describe("A string that contains the expression syntax pattern");

export type StringContainingExpressionSyntax = z.infer<
  typeof STRING_CONTAINING_EXPRESSION_SYNTAX_SCHEMA
>;

export const PRE_IF_SCHEMA = z
  .string()
  .describe("Allows you to define conditions for the `pre:` action execution");

export type PreIf = z.infer<typeof PRE_IF_SCHEMA>;

export const POST_IF_SCHEMA = z
  .string()
  .describe("Allows you to define conditions for the `post:` action execution");

export type PostIf = z.infer<typeof POST_IF_SCHEMA>;

export const INPUT_SCHEMA = z.object({
  description: z.string().describe("A string description of the input parameter"),
  deprecationMessage: z
    .string()
    .optional()
    .describe("A string shown to users using the deprecated input"),
  required: z
    .boolean()
    .optional()
    .describe("A boolean to indicate whether the action requires the input parameter"),
  default: z.string().optional().describe("A string representing the default value"),
});

export type InputSchema = z.infer<typeof INPUT_SCHEMA>;

export const INPUTS_SCHEMA = z
  .record(z.string().regex(/^[_a-z][\w-]*$/i), INPUT_SCHEMA)
  .describe(
    "Input parameters allow you to specify data that the action expects to use during runtime",
  );

export type InputsSchema = z.infer<typeof INPUTS_SCHEMA>;

export const BASE_OUTPUT_SCHEMA = z.object({
  description: z.string().describe("A string description of the output parameter"),
});

export type BaseOutputSchema = z.infer<typeof BASE_OUTPUT_SCHEMA>;

export const OUTPUT_SCHEMA = BASE_OUTPUT_SCHEMA.extend({
  value: z
    .null()
    .optional()
    .describe("We need to null & optional to try and make it work with conditional validations."),
});

export type OutputSchema = z.infer<typeof OUTPUT_SCHEMA>;

export const COMPOSITE_OUTPUT_SCHEMA = BASE_OUTPUT_SCHEMA.extend({
  value: z.string().describe("The value that the output parameter will be mapped to"),
});

export type CompositeOutputSchema = z.infer<typeof OUTPUT_SCHEMA>;

export const OUTPUTS_SCHEMA = z
  .record(z.string().regex(/^[_a-z][\w-]*$/i), OUTPUT_SCHEMA)
  .describe("Output parameters for Docker container and JavaScript actions");

export type OutputsSchema = z.infer<typeof OUTPUTS_SCHEMA>;

export const COMPOSITE_OUTPUTS_SCHEMA = z
  .record(z.string().regex(/^[_a-z][\w-]*$/i), COMPOSITE_OUTPUT_SCHEMA)
  .describe("Output parameters for composite actions");

export type CompositeOutputsSchema = z.infer<typeof COMPOSITE_OUTPUTS_SCHEMA>;

export const RUNS_JAVASCRIPT_SCHEMA = z
  .object({
    "using": z
      .enum(["node12", "node16", "node20"])
      .describe("The application used to execute the code"),
    "main": z.string().describe("The file that contains your action code"),
    "pre": z.string().optional().describe("Allows you to run a script at the start of a job"),
    "pre-if": PRE_IF_SCHEMA.optional(),
    "post": z.string().optional().describe("Allows you to run a script at the end of a job"),
    "post-if": POST_IF_SCHEMA.optional(),
  })
  .describe(
    "Configures the path to the action's code and the application used to execute the code",
  );

export type JavaScriptRun = z.infer<typeof RUNS_JAVASCRIPT_SCHEMA>;

export const RUNS_COMPOSITE_STEP_SCHEMA = z
  .object({
    "run": z.string().optional().describe("The command you want to run"),
    "shell": z.string().optional().describe("The shell where you want to run the command"),
    "uses": z.string().optional().describe("Selects an action to run as part of a step in your job"),
    "with": z
      .record(z.string(), z.unknown())
      .optional()
      .describe("A map of the input parameters defined by the action"),
    "name": z.string().optional().describe("The name of the composite run step"),
    "id": z.string().optional().describe("A unique identifier for the step"),
    "if": z.string().optional().describe("Defines conditions for step execution"),
    "env": z
      .union([
        z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
        STRING_CONTAINING_EXPRESSION_SYNTAX_SCHEMA,
      ])
      .optional()
      .describe("Sets a map of environment variables for only that step"),
    "continue-on-error": z
      .union([z.boolean(), EXPRESSION_SYNTAX_SCHEMA])
      .optional()
      .describe("Prevents a job from failing when a step fails"),
    "working-directory": z
      .string()
      .optional()
      .describe("Specifies the working directory where the command is run"),
  })
  .refine((data) => (data.run && data.shell) || data.uses, {
    message: "Either 'run' and 'shell' or 'uses' must be specified",
  })
  .describe("Configures a step in a composite action");

export type CompositeRunStep = z.infer<typeof RUNS_COMPOSITE_STEP_SCHEMA>;

export const RUNS_COMPOSITE_SCHEMA = z
  .object({
    using: z.literal("composite").describe("Indicates that this is a composite action"),
    steps: z
      .array(RUNS_COMPOSITE_STEP_SCHEMA)
      .describe("The run steps that you plan to run in this action"),
  })
  .describe("Configures the path to the composite action");

export type CompositeRun = z.infer<typeof RUNS_COMPOSITE_SCHEMA>;

export const RUNS_DOCKER_SCHEMA = z
  .object({
    "using": z.literal("docker").describe("Indicates that this is a Docker container action"),
    "image": z.string().describe("The Docker image to use as the container to run the action"),
    "env": z
      .union([
        z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
        STRING_CONTAINING_EXPRESSION_SYNTAX_SCHEMA,
      ])
      .optional()
      .describe(
        "Specifies a key/value map of environment variables to set in the container environment",
      ),
    "entrypoint": z.string().optional().describe("Overrides the Docker ENTRYPOINT in the Dockerfile"),
    "pre-entrypoint": z
      .string()
      .optional()
      .describe("Allows you to run a script before the entrypoint action begins"),
    "pre-if": PRE_IF_SCHEMA.optional(),
    "post-entrypoint": z
      .string()
      .optional()
      .describe("Allows you to run a cleanup script once the runs.entrypoint action has completed"),
    "post-if": POST_IF_SCHEMA.optional(),
    "args": z
      .array(z.string())
      .optional()
      .describe("An array of strings that define the inputs for a Docker container"),
  })
  .describe("Configures the image used for the Docker action");

export type DockerRun = z.infer<typeof RUNS_DOCKER_SCHEMA>;

export const RUNS_SCHEMA = z
  .union([RUNS_JAVASCRIPT_SCHEMA, RUNS_COMPOSITE_SCHEMA, RUNS_DOCKER_SCHEMA])
  .describe("Configures the action's runtime");

export type Runs = z.infer<typeof RUNS_SCHEMA>;

export const BRANDING_COLOR_SCHEMA = z
  .enum(["white", "yellow", "blue", "green", "orange", "red", "purple", "gray-dark"])
  .describe("The background color of the badge");

export type BrandingColor = z.infer<typeof BRANDING_COLOR_SCHEMA>;

export const BRANDING_ICON_SCHEMA = z
  .enum([
    "activity",
    "airplay",
    "alert-circle",
    "alert-octagon",
    "alert-triangle",
    "align-center",
    "align-justify",
    "align-left",
    "align-right",
    "anchor",
    "aperture",
    "archive",
    "arrow-down-circle",
    "arrow-down-left",
    "arrow-down-right",
    "arrow-down",
    "arrow-left-circle",
    "arrow-left",
    "arrow-right-circle",
    "arrow-right",
    "arrow-up-circle",
    "arrow-up-left",
    "arrow-up-right",
    "arrow-up",
    "at-sign",
    "award",
    "bar-chart-2",
    "bar-chart",
    "battery-charging",
    "battery",
    "bell-off",
    "bell",
    "bluetooth",
    "bold",
    "book-open",
    "book",
    "bookmark",
    "box",
    "briefcase",
    "calendar",
    "camera-off",
    "camera",
    "cast",
    "check-circle",
    "check-square",
    "check",
    "chevron-down",
    "chevron-left",
    "chevron-right",
    "chevron-up",
    "chevrons-down",
    "chevrons-left",
    "chevrons-right",
    "chevrons-up",
    "circle",
    "clipboard",
    "clock",
    "cloud-drizzle",
    "cloud-lightning",
    "cloud-off",
    "cloud-rain",
    "cloud-snow",
    "cloud",
    "code",
    "command",
    "compass",
    "copy",
    "corner-down-left",
    "corner-down-right",
    "corner-left-down",
    "corner-left-up",
    "corner-right-down",
    "corner-right-up",
    "corner-up-left",
    "corner-up-right",
    "cpu",
    "credit-card",
    "crop",
    "crosshair",
    "database",
    "delete",
    "disc",
    "dollar-sign",
    "download-cloud",
    "download",
    "droplet",
    "edit-2",
    "edit-3",
    "edit",
    "external-link",
    "eye-off",
    "eye",
    "fast-forward",
    "feather",
    "file-minus",
    "file-plus",
    "file-text",
    "file",
    "film",
    "filter",
    "flag",
    "folder-minus",
    "folder-plus",
    "folder",
    "gift",
    "git-branch",
    "git-commit",
    "git-merge",
    "git-pull-request",
    "globe",
    "grid",
    "hard-drive",
    "hash",
    "headphones",
    "heart",
    "help-circle",
    "home",
    "image",
    "inbox",
    "info",
    "italic",
    "layers",
    "layout",
    "life-buoy",
    "link-2",
    "link",
    "list",
    "loader",
    "lock",
    "log-in",
    "log-out",
    "mail",
    "map-pin",
    "map",
    "maximize-2",
    "maximize",
    "menu",
    "message-circle",
    "message-square",
    "mic-off",
    "mic",
    "minimize-2",
    "minimize",
    "minus-circle",
    "minus-square",
    "minus",
    "monitor",
    "moon",
    "more-horizontal",
    "more-vertical",
    "move",
    "music",
    "navigation-2",
    "navigation",
    "octagon",
    "package",
    "paperclip",
    "pause-circle",
    "pause",
    "percent",
    "phone-call",
    "phone-forwarded",
    "phone-incoming",
    "phone-missed",
    "phone-off",
    "phone-outgoing",
    "phone",
    "pie-chart",
    "play-circle",
    "play",
    "plus-circle",
    "plus-square",
    "plus",
    "pocket",
    "power",
    "printer",
    "radio",
    "refresh-ccw",
    "refresh-cw",
    "repeat",
    "rewind",
    "rotate-ccw",
    "rotate-cw",
    "rss",
    "save",
    "scissors",
    "search",
    "send",
    "server",
    "settings",
    "share-2",
    "share",
    "shield-off",
    "shield",
    "shopping-bag",
    "shopping-cart",
    "shuffle",
    "sidebar",
    "skip-back",
    "skip-forward",
    "slash",
    "sliders",
    "smartphone",
    "speaker",
    "square",
    "star",
    "stop-circle",
    "sun",
    "sunrise",
    "sunset",
    "table",
    "tablet",
    "tag",
    "target",
    "terminal",
    "thermometer",
    "thumbs-down",
    "thumbs-up",
    "toggle-left",
    "toggle-right",
    "trash-2",
    "trash",
    "trending-down",
    "trending-up",
    "triangle",
    "truck",
    "tv",
    "type",
    "umbrella",
    "underline",
    "unlock",
    "upload-cloud",
    "upload",
    "user-check",
    "user-minus",
    "user-plus",
    "user-x",
    "user",
    "users",
    "video-off",
    "video",
    "voicemail",
    "volume-1",
    "volume-2",
    "volume-x",
    "volume",
    "watch",
    "wifi-off",
    "wifi",
    "wind",
    "x-circle",
    "x-square",
    "x",
    "zap-off",
    "zap",
    "zoom-in",
    "zoom-out",
  ])
  .describe("The name of the Feather icon to use");

export type BrandingIcon = z.infer<typeof BRANDING_ICON_SCHEMA>;

export const BRANDING_SCHEMA = z
  .object({
    color: BRANDING_COLOR_SCHEMA.optional(),
    icon: BRANDING_ICON_SCHEMA.optional(),
  })
  .describe("Configures the badge for the action");

export type Branding = z.infer<typeof BRANDING_SCHEMA>;

export const ACTION_SCHEMA = z.object({
  name: z.string().describe("The name of your action"),
  author: z.string().optional().describe("The name of the action's author"),
  description: z.string().describe("A short description of the action"),
  inputs: INPUTS_SCHEMA.optional(),
  outputs: z.union([OUTPUTS_SCHEMA, COMPOSITE_OUTPUTS_SCHEMA]).optional(),
  runs: z.union([RUNS_JAVASCRIPT_SCHEMA, RUNS_COMPOSITE_SCHEMA, RUNS_DOCKER_SCHEMA]),
  branding: BRANDING_SCHEMA.optional(),
});

export type Action = z.infer<typeof ACTION_SCHEMA>;
