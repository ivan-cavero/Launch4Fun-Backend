import { afterAll, beforeAll } from "bun:test"
import { app } from "../../src/index"

let server: ReturnType<typeof app.listen>

beforeAll(() => {
	server = app.listen(process.env.PORT || 3000)
	globalThis.testURL = `http://${app.server?.hostname}:${app.server?.port}`
})

afterAll(() => {
	if (server) {
		server.stop()
	}
})
