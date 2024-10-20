import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Actions Kit",
  description: "A toolkit for GitHub Actions",
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/luxass/actions-kit' }
    ]
  }
})
