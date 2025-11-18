import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.unlink", () => {
    it("should unlink callbacks", () => {
        const dsp = Dsp.create()

        const l1 = Dsp.add(dsp, () => {})
        const l2 = Dsp.add(dsp, () => {})
        const l3 = Dsp.add(dsp, () => {})

        Dsp.unlink(l2)
        expect(l2!.nextVal).toBe(undefined)
        expect(l2!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(l3)
        expect(l3!.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        Dsp.unlink(l3)
        expect(l3!.nextVal).toBe(undefined)
        expect(l3!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        Dsp.unlink(l1)
        expect(l1!.nextVal).toBe(undefined)
        expect(l1!.prevVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should unlink dsps #1", () => {
        const dsp = Dsp.create()

        const dsp1 = Dsp.create()
        const dsp2 = Dsp.create()
        const dsp3 = Dsp.create()

        const l1 = Dsp.add(dsp, dsp1)
        const l2 = Dsp.add(dsp, dsp2)
        const l3 = Dsp.add(dsp, dsp3)

        Dsp.unlink(l2)
        expect(dsp2.dsps).toBe(undefined)
        expect(l2!.nextVal).toBe(undefined)
        expect(l2!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(l3)
        expect(l3!.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        Dsp.unlink(l3)
        expect(dsp3.dsps).toBe(undefined)
        expect(l3!.nextVal).toBe(undefined)
        expect(l3!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        Dsp.unlink(l1)
        expect(dsp1.dsps).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should unlink dsps #2", () => {
        const dsp1 = Dsp.create()
        const dsp2 = Dsp.create()
        const dsp3 = Dsp.create()

        const dsp = Dsp.create()

        const l1 = Dsp.add(dsp1, dsp)
        const l2 = Dsp.add(dsp2, dsp)
        const l3 = Dsp.add(dsp3, dsp)

        Dsp.unlink(l2)
        expect(l2!.nextDsp).toBe(undefined)
        expect(l2!.prevDsp).toBe(undefined)
        expect(l1!.nextDsp).toBe(l3)
        expect(l3!.prevDsp).toBe(l1)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l3)

        Dsp.unlink(l3)
        expect(l3!.nextDsp).toBe(undefined)
        expect(l3!.prevDsp).toBe(undefined)
        expect(l1!.nextDsp).toBe(undefined)
        expect(dsp3.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l1)

        Dsp.unlink(l1)
        expect(l1!.nextDsp).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })
})
