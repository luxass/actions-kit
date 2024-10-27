<script setup lang="ts">
import { data } from './index.data.ts'
</script>

# Examples

In this section, you can see practical examples to create your application with Hono.

<ul v-for="item of data">
  <li><a :href="item.link">{{ item.title }}</a></li>
</ul>

## GitHub repository

You can also see the examples in the GitHub repository: [Actions Kit Examples](https://github.com/luxass/actions-kit/tree/main/examples).
