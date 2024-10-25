import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Actions Kit",
	description: "A toolkit for GitHub Actions",
	ignoreDeadLinks: false,
	themeConfig: {
		search: {
			provider: "local",
		},
		socialLinks: [{ icon: "github", link: "https://github.com/luxass/actions-kit" }],
		nav: [
			{ text: "Guide", link: "/guide/" },
			{ text: "API", link: "/api/" },
		],
		sidebar: [
			{
				text: "Guide",
				items: [
					{ text: "Introduction", link: "/guide/" },
					{ text: "Getting Started", link: "/guide/getting-started" },
				],
			},
			{
				text: "API",
				items: [{ text: "Inputs", link: "/api" }],
			},
		],
	},
});
