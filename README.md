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

There will be a `graph.html` in which you can inspect the dependency graph of a specific module.

## Credits
Inspired by https://github.com/ondras/rollup-plugin-graph
