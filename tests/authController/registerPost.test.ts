import { describe, expect, it } from "bun:test"

describe("POST /register", () => {
	it("should successfully register a user with valid credentials", async () => {
		const response = await fetch(`${globalThis.testURL}/register`, {
			method: "POST",
			body: JSON.stringify({
				username: `unique-${Date.now()}`,
				password: "securePassword",
				email: `unique-${Date.now()}@example.com` // Ensure unique email
			}),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Registration successful")
	})

	it("should reject registration with an existing username", async () => {
		// Assume "existingUser" already exists in the database
		const response = await fetch(`${globalThis.testURL}/register`, {
			method: "POST",
			body: JSON.stringify({
				username: "existingUser",
				password: "securePassword",
				email: "newemail@example.com"
			}),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Username is already taken")
	})

	it("should reject registration with an existing email", async () => {
		// Assume "existingemail@example.com" already exists in the database
		const response = await fetch(`${globalThis.testURL}/register`, {
			method: "POST",
			body: JSON.stringify({
				username: "newUserWithExistingEmail",
				password: "securePassword",
				email: "existingemail@example.com"
			}),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Email is already in use")
	})

	it("should return an error if required fields are missing", async () => {
		const response = await fetch(`${globalThis.testURL}/register`, {
			method: "POST",
			body: JSON.stringify({ username: "userWithoutEmailOrPassword" }),
			headers: { "Content-Type": "application/json" }
		})

		const res = await response.json()
		expect(res).toHaveProperty("message", "Required property")
	})
})
