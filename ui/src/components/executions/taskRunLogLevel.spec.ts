import {describe, it, expect, beforeEach, afterEach} from "vitest"
import {LOG_LEVELS} from "@kestra-io/design-system"
import {storageKeys} from "../../utils/constants"
import {defaultTaskRunLogLevel, toLevelKey} from "./taskRunLogLevel"

describe("toLevelKey", () => {
    it.each(LOG_LEVELS)("returns %s unchanged", (level) => {
        expect(toLevelKey(level)).toBe(level)
    })

    it("falls back to INFO for an unknown string", () => {
        expect(toLevelKey("NOT_A_LEVEL")).toBe("INFO")
    })

    it("falls back to INFO for null", () => {
        expect(toLevelKey(null)).toBe("INFO")
    })

    it("does not accept a lower-case level name", () => {
        expect(toLevelKey("debug")).toBe("INFO")
    })
})

describe("defaultTaskRunLogLevel", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        localStorage.clear()
    })

    it("returns the stored level when it is a known level", () => {
        localStorage.setItem(storageKeys.DEFAULT_LOG_LEVEL, "ERROR")

        expect(defaultTaskRunLogLevel()).toBe("ERROR")
    })

    it("returns INFO when nothing is stored", () => {
        expect(defaultTaskRunLogLevel()).toBe("INFO")
    })
})
