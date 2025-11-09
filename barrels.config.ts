import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/disposables/src/Dsp",
        exclude: ["**/internals.ts"],
    }),
    flat({
        entries: "./packages/disposables/src",
        include: ["*", "Dsp/index.js"],
    }),
])
