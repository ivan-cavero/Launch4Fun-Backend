import { Elysia, t } from "elysia"
import { login, register } from "../controllers/AuthenticationController"
import { RequestContext } from "../types/requestContext"

const authenticationRoutes = (app: Elysia) => {
	app.post(
		"/login",
		async (context: RequestContext) => {
			return login(context)
		},
		{
			body: t.Object(
				{
					username: t.String(),
					password: t.String()
				},
				{
					description: "Expected an username and password"
				}
			),
			detail: {
				summary: "Sign in the user",
				tags: ["authentication"]
			}
		}
	)
	app.post(
		"/register",
		async (context: RequestContext) => {
			return register(context)
		},
		{
			body: t.Object(
				{
					username: t.String(),
					password: t.String(),
					email: t.String()
				},
				{
					description: "Expected username, password, and email for registration"
				}
			),
			detail: {
				summary: "Register a new user",
				tags: ["authentication"]
			}
		}
	)
	app.post(
		"/logout",
		async (context: RequestContext) => {
			return login(context)
		},
		{
			detail: {
				summary: "Log out the current user",
				tags: ["authentication"]
			}
		}
	)
}

export default authenticationRoutes
