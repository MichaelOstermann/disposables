import type { TreeShakeImportResolver } from "@monstermann/tree-shake-import-namespaces"

const treeshake: TreeShakeImportResolver = function ({ importAlias, importName, importPath, propertyName }) {
    if (importPath === "@monstermann/disposables" && importName === "Dsp")
        return `import { ${propertyName} as ${importAlias} } from "@monstermann/disposables/Dsp/${propertyName}.js"`
    return undefined
}

export default treeshake
