import { examplesSidebar } from '../.vitepress/config'

export default {
  load() {
    return {
      examples: examplesSidebar,
    }
  },
}
