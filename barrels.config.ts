import { defineConfig } from "@monstermann/barrels"
import { flat } from "@monstermann/barrels-flat"
import { namespace } from "@monstermann/barrels-namespace"

export default defineConfig([
    namespace({
        entries: "./packages/dsp/src/Dsp",
        exclude: ["**/internals.ts"],
    }),
    flat({
        entries: "./packages/dsp/src",
        include: ["*", "Dsp/index.js"],
    }),
])
