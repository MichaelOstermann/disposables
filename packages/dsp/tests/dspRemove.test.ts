import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.remove", () => {
    it("should remove callbacks", () => {
        const dsp = Dsp.create()

        const cb1 = () => {}
        const cb2 = () => {}
        const cb3 = () => {}

        const l1 = Dsp.add(dsp, cb1)
        const l2 = Dsp.add(dsp, cb2)
        const l3 = Dsp.add(dsp, cb3)

        Dsp.remove(dsp, cb2)
        expect(l2!.nextVal).toBe(undefined)
        expect(l2!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(l3)
        expect(l3!.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        Dsp.remove(dsp, cb3)
        expect(l3!.nextVal).toBe(undefined)
        expect(l3!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        Dsp.remove(dsp, cb1)
        expect(l1!.nextVal).toBe(undefined)
        expect(l1!.prevVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should remove dsps #1", () => {
        const dsp = Dsp.create()

        const dsp1 = Dsp.create()
        const dsp2 = Dsp.create()
        const dsp3 = Dsp.create()

        const l1 = Dsp.add(dsp, dsp1)
        const l2 = Dsp.add(dsp, dsp2)
        const l3 = Dsp.add(dsp, dsp3)

        Dsp.remove(dsp, dsp2)
        expect(dsp2.dsps).toBe(undefined)
        expect(l2!.nextVal).toBe(undefined)
        expect(l2!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(l3)
        expect(l3!.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        Dsp.remove(dsp, dsp3)
        expect(dsp3.dsps).toBe(undefined)
        expect(l3!.nextVal).toBe(undefined)
        expect(l3!.prevVal).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        Dsp.remove(dsp, dsp1)
        expect(dsp1.dsps).toBe(undefined)
        expect(l1!.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should remove dsps #2", () => {
        const dsp1 = Dsp.create()
        const dsp2 = Dsp.create()
        const dsp3 = Dsp.create()

        const dsp = Dsp.create()

        const l1 = Dsp.add(dsp1, dsp)
        const l2 = Dsp.add(dsp2, dsp)
        const l3 = Dsp.add(dsp3, dsp)

        Dsp.remove(dsp2, dsp)
        expect(l2!.nextDsp).toBe(undefined)
        expect(l2!.prevDsp).toBe(undefined)
        expect(l1!.nextDsp).toBe(l3)
        expect(l3!.prevDsp).toBe(l1)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l3)

        Dsp.remove(dsp3, dsp)
        expect(l3!.nextDsp).toBe(undefined)
        expect(l3!.prevDsp).toBe(undefined)
        expect(l1!.nextDsp).toBe(undefined)
        expect(dsp3.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l1)

        Dsp.remove(dsp1, dsp)
        expect(l1!.nextDsp).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })
})
