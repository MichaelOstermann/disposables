import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.isDisposed", () => {
    it("should return true for disposed dsp instances", () => {
        const dsp = Dsp.create()
        Dsp.dispose(dsp)
        expect(Dsp.isDisposed(dsp)).toBe(true)
    })

    it("should return false for alive dsp instances", () => {
        const dsp = Dsp.create()
        expect(Dsp.isDisposed(dsp)).toBe(false)
    })
})
