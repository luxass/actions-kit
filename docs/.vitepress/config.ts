import { defineConfig, type DefaultTheme } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";

const defaultSidebar = [
	{ text: "Introduction", link: "/guide/" },
	{ text: "Getting Started", link: "/guide/getting-started" },
	{ text: "Configuration", link: "/guide/configuration" },
	{
		text: "Builders",
		items: [
			{
				text: "Overview",
				link: "/builders/overview",
			},
			{
				text: "ESBuild",
				link: "/builders/esbuild",
			},
			{
				text: "Rolldown",
				link: "/builders/rolldown",
			},
			{
				text: "Rollup",
				link: "/builders/rollup",
			},
			{
				text: "Rspack",
				link: "/builders/rspack",
			},
			{
				text: "Vite",
				link: "/builders/vite",
			},
			{
				text: "Webpack",
				link: "/builders/webpack",
			},
		],
	},
	{
		text: "API",
		collapsed: false,
		items: [
			{ text: "Overview", link: "/api/overview"},
			{ text: "Inputs", link: "/api/inputs" },
			{ text: "Events", link: "/api/events" },
		],
	},
	{
		text: "Examples",
		link: "/examples/",
	},
] satisfies DefaultTheme.SidebarItem[];

export const examplesSidebar = [
	{
		text: "Builders",
		items: [
			{ text: "With ESBuild", link: "/examples/with-esbuild" },
			{ text: "With Rolldown", link: "/examples/with-rolldown" },
			{ text: "With Rollup", link: "/examples/with-rollup" },
			{ text: "With Rspack", link: "/examples/with-rspack" },
			{ text: "With Vite", link: "/examples/with-vite" },
			{ text: "With Webpack", link: "/examples/with-webpack" },
		],
	},
] satisfies DefaultTheme.SidebarItem[];

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Actions Kit",
	description: "A toolkit for GitHub Actions",
	ignoreDeadLinks: false,
	cleanUrls: true,
	themeConfig: {
		search: {
			provider: "local",
		},
		outline: [2, 5],
		socialLinks: [{ icon: "github", link: "https://github.com/luxass/actions-kit" }],
		nav: [
			{ text: "Guide", link: "/guide/" },
			{ text: "API", link: "/api/" },
			{ text: "Config", link: "/config/" },
			{ text: "Examples", link: "/examples" },
		],
		sidebar: {
			"/guide/": defaultSidebar,
			"/builders/": defaultSidebar,
			"/config/": [
				{ text: "Overview", link: "/config/" },
				{ text: "Action", link: "/config/action" },
				{ text: "Builders", link: "/config/builders" },
				{ text: "Autocomplete", link: "/config/autocomplete" },
			],
			"/api/": defaultSidebar,
			"/examples/": examplesSidebar,
		},
	},
	markdown: {
		config(md) {
			md.use(groupIconMdPlugin);
		},
	},
	vite: {
		plugins: [groupIconVitePlugin()],
	},
});
