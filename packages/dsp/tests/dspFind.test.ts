import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.find", () => {
    it("should return undefined for missing callbacks", () => {
        const dsp = Dsp.create()
        expect(Dsp.find(dsp, () => {})).toBe(undefined)
    })

    it("should return undefined for missing dsps", () => {
        const dsp = Dsp.create()
        expect(Dsp.find(dsp, Dsp.create())).toBe(undefined)
    })

    it("should return link for included callbacks", () => {
        const dsp = Dsp.create()
        const cb = () => {}
        const link = Dsp.add(dsp, cb)
        expect(Dsp.find(dsp, cb)).toBe(link)
    })

    it("should return link for included dsps", () => {
        const dspA = Dsp.create()
        const dspB = Dsp.create()
        const link = Dsp.add(dspA, dspB)
        expect(Dsp.find(dspA, dspB)).toBe(link)
    })
})
