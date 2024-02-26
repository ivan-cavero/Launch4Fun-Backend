import { Elysia } from "elysia"
import authenticationRoutes from "./AuthenticationRoutes"

const setupRoutes = (app: Elysia) => {
	app.get("/", () => 'Server is up')
	authenticationRoutes(app)
}

export default setupRoutes
