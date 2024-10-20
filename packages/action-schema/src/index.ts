import { z } from "zod";

// Helper schemas
export const expressionSyntax = z
	.string()
	.regex(/^\$\{\{(.|[\r\n])*\}\}$/)
	.describe("A string that matches the expression syntax pattern");

export const stringContainingExpressionSyntax = z
	.string()
	.regex(/^.*\$\{\{(.|[\r\n])*\}\}.*$/)
	.describe("A string that contains the expression syntax pattern");

export const preIf = z
	.string()
	.describe("Allows you to define conditions for the `pre:` action execution");

export const postIf = z
	.string()
	.describe("Allows you to define conditions for the `post:` action execution");

// Custom string type for input and output keys
export const validIdentifier = z
	.string()
	.regex(/^[_a-zA-Z][a-zA-Z0-9_-]*$/)
	.describe(
		"A string identifier that starts with a letter or underscore and contains only alphanumeric characters, hyphens, or underscores",
	);

// Input schema
export const inputSchema = z.object({
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

// Outputs schemas
export const outputSchema = z.object({
	description: z.string().describe("A string description of the output parameter"),
});

export const outputCompositeSchema = outputSchema.extend({
	value: z.string().describe("The value that the output parameter will be mapped to"),
});

export const outputs = z
	.record(validIdentifier, outputSchema)
	.describe("Output parameters for Docker container and JavaScript actions");

export const outputsComposite = z
	.record(validIdentifier, outputCompositeSchema)
	.describe("Output parameters for composite actions");

// Runs schemas
export const runsJavascript = z
	.object({
		using: z
			.enum(["node12", "node16", "node20"])
			.describe("The application used to execute the code"),
		main: z.string().describe("The file that contains your action code"),
		pre: z.string().optional().describe("Allows you to run a script at the start of a job"),
		"pre-if": preIf.optional(),
		post: z.string().optional().describe("Allows you to run a script at the end of a job"),
		"post-if": postIf.optional(),
	})
	.describe(
		"Configures the path to the action's code and the application used to execute the code",
	);

export const runsCompositeStep = z
	.object({
		run: z.string().optional().describe("The command you want to run"),
		shell: z.string().optional().describe("The shell where you want to run the command"),
		uses: z.string().optional().describe("Selects an action to run as part of a step in your job"),
		with: z
			.record(z.unknown())
			.optional()
			.describe("A map of the input parameters defined by the action"),
		name: z.string().optional().describe("The name of the composite run step"),
		id: z.string().optional().describe("A unique identifier for the step"),
		if: z.string().optional().describe("Defines conditions for step execution"),
		env: z
			.union([
				z.record(z.union([z.string(), z.number(), z.boolean()])),
				stringContainingExpressionSyntax,
			])
			.optional()
			.describe("Sets a map of environment variables for only that step"),
		"continue-on-error": z
			.union([z.boolean(), expressionSyntax])
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

export const runsComposite = z
	.object({
		using: z.literal("composite").describe("Indicates that this is a composite action"),
		steps: z.array(runsCompositeStep).describe("The run steps that you plan to run in this action"),
	})
	.describe("Configures the path to the composite action");

export const runsDocker = z
	.object({
		using: z.literal("docker").describe("Indicates that this is a Docker container action"),
		image: z.string().describe("The Docker image to use as the container to run the action"),
		env: z
			.union([
				z.record(z.union([z.string(), z.number(), z.boolean()])),
				stringContainingExpressionSyntax,
			])
			.optional()
			.describe(
				"Specifies a key/value map of environment variables to set in the container environment",
			),
		entrypoint: z.string().optional().describe("Overrides the Docker ENTRYPOINT in the Dockerfile"),
		"pre-entrypoint": z
			.string()
			.optional()
			.describe("Allows you to run a script before the entrypoint action begins"),
		"pre-if": preIf.optional(),
		"post-entrypoint": z
			.string()
			.optional()
			.describe("Allows you to run a cleanup script once the runs.entrypoint action has completed"),
		"post-if": postIf.optional(),
		args: z
			.array(z.string())
			.optional()
			.describe("An array of strings that define the inputs for a Docker container"),
	})
	.describe("Configures the image used for the Docker action");

export const runs = z
	.union([runsJavascript, runsComposite, runsDocker])
	.describe("Configures the action's runtime");

// Branding schema
export const brandingSchema = z
	.object({
		color: z
			.enum(["white", "yellow", "blue", "green", "orange", "red", "purple", "gray-dark"])
			.optional()
			.describe("The background color of the badge"),
		icon: z
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
			.optional()
			.describe("The name of the Feather icon to use"),
	})
	.describe("Configures the badge for the action");

// Main schema
export const githubActionSchema = z
	.object({
		name: z.string().describe("The name of your action"),
		author: z.string().optional().describe("The name of the action's author"),
		description: z.string().describe("A short description of the action"),
		inputs: z
			.record(validIdentifier, inputSchema)
			.optional()
			.describe(
				"Input parameters allow you to specify data that the action expects to use during runtime",
			),
		outputs: z.union([outputs, outputsComposite]).optional(),
		runs: runs,
		branding: brandingSchema.optional(),
	})
	.refine(
		(data) => {
			if (data.runs.using === "composite") {
				return outputsComposite.safeParse(data.outputs).success;
			}
			return outputs.safeParse(data.outputs).success;
		},
		{
			message: "Outputs schema must match the type of 'runs'",
			path: ["outputs"],
		},
	)
	.describe("GitHub Action metadata schema");
