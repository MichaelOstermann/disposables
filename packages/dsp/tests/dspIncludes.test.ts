import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.includes", () => {
    it("should return false for missing callbacks", () => {
        const dsp = Dsp.create()
        expect(Dsp.includes(dsp, () => {})).toBe(false)
    })

    it("should return false for missing dsps", () => {
        const dsp = Dsp.create()
        expect(Dsp.includes(dsp, Dsp.create())).toBe(false)
    })

    it("should return true for included callbacks", () => {
        const dsp = Dsp.create()
        const cb = () => {}
        Dsp.add(dsp, cb)
        expect(Dsp.includes(dsp, cb)).toBe(true)
    })

    it("should return true for included dsps", () => {
        const dspA = Dsp.create()
        const dspB = Dsp.create()
        Dsp.add(dspA, dspB)
        expect(Dsp.includes(dspA, dspB)).toBe(true)
        expect(Dsp.includes(dspB, dspA)).toBe(false)
    })
})
