import { defineConfig } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

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
			{
				text: "Builders",
				items: [
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
				text: "Builders",
				items: [
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
				items: [{ text: "Inputs", link: "/api" }],
			},
		],
	},
	markdown: {
		config(md) {
			md.use(groupIconMdPlugin);
		},
	},
	vite: {
		plugins: [
			groupIconVitePlugin()
		]
	}
});
