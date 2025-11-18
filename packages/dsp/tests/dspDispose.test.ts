import { describe, expect, it } from "vitest"
import { Dsp } from ".."

describe("Dsp.dispose", () => {
    it("should dispose callbacks", () => {
        const calls: number[] = []
        const dsp = Dsp.create()
        Dsp.add(dsp, () => calls.push(1))
        Dsp.add(dsp, () => calls.push(2))
        Dsp.add(dsp, () => calls.push(3))
        Dsp.dispose(dsp)
        Dsp.dispose(dsp)
        expect(calls).toEqual([3, 2, 1])
    })

    it("should dispose dsps #1", () => {
        const calls: number[] = []

        const dsp = Dsp.create()
        Dsp.add(dsp, () => calls.push(1))
        Dsp.add(dsp, () => calls.push(2))
        Dsp.add(dsp, () => calls.push(3))

        const dsp1 = Dsp.create()
        Dsp.add(dsp1, () => calls.push(4))
        Dsp.add(dsp1, () => calls.push(5))
        Dsp.add(dsp1, () => calls.push(6))

        const dsp2 = Dsp.create()
        Dsp.add(dsp2, () => calls.push(7))
        Dsp.add(dsp2, () => calls.push(8))
        Dsp.add(dsp2, () => calls.push(9))

        const dsp3 = Dsp.create()
        Dsp.add(dsp3, () => calls.push(10))
        Dsp.add(dsp3, () => calls.push(11))
        Dsp.add(dsp3, () => calls.push(12))

        Dsp.add(dsp, dsp1)
        Dsp.add(dsp, dsp2)
        Dsp.add(dsp, dsp3)

        Dsp.dispose(dsp)
        Dsp.dispose(dsp)
        Dsp.dispose(dsp1)
        Dsp.dispose(dsp2)
        Dsp.dispose(dsp3)

        expect(calls).toEqual([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    })

    it("should dispose dsps #2", () => {
        const calls: number[] = []

        const dsp = Dsp.create()
        Dsp.add(dsp, () => calls.push(1))
        Dsp.add(dsp, () => calls.push(2))
        Dsp.add(dsp, () => calls.push(3))

        const dsp1 = Dsp.create()
        Dsp.add(dsp1, () => calls.push(4))
        Dsp.add(dsp1, () => calls.push(5))
        Dsp.add(dsp1, () => calls.push(6))

        const dsp2 = Dsp.create()
        Dsp.add(dsp2, () => calls.push(7))
        Dsp.add(dsp2, () => calls.push(8))
        Dsp.add(dsp2, () => calls.push(9))

        const dsp3 = Dsp.create()
        Dsp.add(dsp3, () => calls.push(10))
        Dsp.add(dsp3, () => calls.push(11))
        Dsp.add(dsp3, () => calls.push(12))

        Dsp.add(dsp, dsp1)
        Dsp.add(dsp, dsp2)
        Dsp.add(dsp, dsp3)

        Dsp.dispose(dsp2)
        Dsp.dispose(dsp2)
        Dsp.dispose(dsp3)
        Dsp.dispose(dsp3)
        Dsp.dispose(dsp1)
        Dsp.dispose(dsp1)
        Dsp.dispose(dsp)
        Dsp.dispose(dsp)

        expect(calls).toEqual([9, 8, 7, 12, 11, 10, 6, 5, 4, 3, 2, 1])
    })
})
