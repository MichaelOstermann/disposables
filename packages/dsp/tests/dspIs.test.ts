import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.isDsp", () => {
    it("should return true for dsp instances", () => {
        const dsp = Dsp.create()
        expect(Dsp.isDsp(dsp)).toBe(true)
    })

    it("should return false for anything else", () => {
        expect(Dsp.isDsp(null)).toBe(false)
        expect(Dsp.isDsp(undefined)).toBe(false)
        expect(Dsp.isDsp(1)).toBe(false)
        expect(Dsp.isDsp("string")).toBe(false)
        expect(Dsp.isDsp({})).toBe(false)
        expect(Dsp.isDsp([])).toBe(false)
    })
})
