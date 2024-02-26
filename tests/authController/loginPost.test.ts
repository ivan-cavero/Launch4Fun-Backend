import { describe, expect, it } from "bun:test"

describe("POST /login", () => {
	it("should authenticate a user with correct credentials", async () => {
		const response = await fetch(`${globalThis.testURL}/login`, {
			method: "POST",
			body: JSON.stringify({
				username: "usuarioTest",
				password: "contrasenaCifrada"
			}),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Login successful")
		expect(res.data).toHaveProperty("username", "usuarioTest")
		expect(res.data).not.toHaveProperty("password")
		expect(res.data).not.toHaveProperty("id")
	})

	it("should reject a user with incorrect credentials", async () => {
		const response = await fetch(`${globalThis.testURL}/login`, {
			method: "POST",
			body: JSON.stringify({
				username: "usuarioTest",
				password: "contrasenaIncorrecta"
			}),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Invalid credentials")
	})

	it("should return an error if the username is missing", async () => {
		const response = await fetch(`${globalThis.testURL}/login`, {
			method: "POST",
			body: JSON.stringify({ password: "contrasenaCifrada" }),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Required property")
	})

	it("should return an error if the password is missing", async () => {
		const response = await fetch(`${globalThis.testURL}/login`, {
			method: "POST",
			body: JSON.stringify({ username: "usuarioTest" }),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Required property")
	})
})
