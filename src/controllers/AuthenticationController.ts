import { loginUser, createUser, findUserByEmail } from "../db/users"
import { errorResponse, successResponse } from "../utils/httpResponses"
import { RequestContext } from "../types/requestContext"

export const login = async ({ body, set, jwt }: RequestContext) => {
	try {
		const user = await loginUser(body.username)
		if (!user || typeof user.password !== "string") {
			set.status = 401
			return errorResponse("Invalid credentials")
		}

		const isMatch = await Bun.password.verify(body.password, user.password)
		if (!isMatch) {
			set.status = 401
			return errorResponse("Invalid credentials")
		}

		const token = await jwt.sign({ username: user.username, id: user.id, role: user.role })

		const { password, id, ...userPayload } = user

		console.info(`User ${user.username} authenticated`)

		return successResponse({ token, ...userPayload }, "Login successful")
	} catch (error) {
		console.error(error)
		set.status = 500
		return errorResponse("An internal server error occurred")
	}
}

export const register = async ({ body, set, jwt }: RequestContext) => {
	try {
		const existingUserByUsername = await loginUser(body.username)
		if (existingUserByUsername) {
			set.status = 409 // Conflict status code
			return errorResponse("Username is already taken")
		}

		const existingUserByEmail = await findUserByEmail(body.email)
		if (existingUserByEmail) {
			set.status = 409 // Conflict status code
			return errorResponse("Email is already in use")
		}

		const user = await createUser(body.username, body.password, body.email)
		if (!user) {
			set.status = 400 // Bad Request status code
			return errorResponse("User registration failed")
		}

		const token = await jwt.sign({ username: user.username, id: user.id, role: user.role })

		console.info(`User ${user.username} registered`)

		const { password, ...userPayload } = user

		return successResponse({ token, ...userPayload }, "Registration successful")
	} catch (error) {
		console.error(error)
		set.status = 500 // Internal Server Error status code
		return errorResponse("An internal server error occurred")
	}
}
