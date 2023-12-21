import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { type Plugin } from "rollup";

export default function plugin(): Plugin {
  return {
    name: "plugin-filter-dep-graph",
    generateBundle() {
      let importersMap: Record<string, readonly string[]> = {};
      for (const moduleId of this.getModuleIds()) {
        const { importers, dynamicImporters } = this.getModuleInfo(moduleId) ?? {};
        const allImporters = [...(importers ?? []), ...(dynamicImporters ?? [])];
        if (allImporters.length > 0) importersMap[moduleId] = allImporters;
      }

      const lcp = longestCommonPrefix(
        // ignore virtual modules
        Object.keys(importersMap).filter((m) => m.startsWith("/"))
      );
      const importersMapString = JSON.stringify(importersMap).replace(
        new RegExp(lcp, "g"),
        ""
      );

      writeFileSync(
        "graph.html",
        readFileSync(new URL('./template.html', import.meta.url))
          .toString()
          .replace(`"data_placeholder"`, importersMapString)
      );
    },
  };
}

function longestCommonPrefix(strings: string[]) {
  return strings.reduce((prefix, string) => {
    while (prefix !== "" && string.indexOf(prefix) != 0) {
      prefix = prefix.slice(0, -1);
    }
    return prefix;
  });
}
