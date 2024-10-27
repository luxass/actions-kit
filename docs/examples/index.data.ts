import { basename } from 'node:path'
import { createContentLoader } from 'vitepress'

export interface Example {
  name: string
  title: string
  link: string
  description: string
}

export default createContentLoader('examples/*.md', {
  includeSrc: true,
  transform(data) {
    const result: Record<string, Example> = {}
    for (const md of data) {
      const name = basename(md.url, '.md')
      if (name === 'index' || name === 'examples') {
        continue
			}

      const title = md.src?.match(/^# (.*)$/m)?.[1]?.trim() ?? name

      result[name] = {
        name,
        title,
        link: `/examples/${name}.html`,
        description: md.frontmatter.description ?? '',
      }
    }

    return result
  },
})

export declare const data: Record<string, Example>
