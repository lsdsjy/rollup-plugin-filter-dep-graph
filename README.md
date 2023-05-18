# rollup-plugin-filter-dep-graph

Filter and visualize the dependency graph for your rollup/vite project.

```sh
npm i rollup-plugin-filter-dep-graph 
```

```js
// rollup.config.js / vite.config.js
import filterDepGraph from 'rollup-plugin-filter-dep-graph'
...
export default {
    ...,
    plugins: [
        filterDepGraph()
    ]
}
```
