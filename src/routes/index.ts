import { Elysia } from "elysia"
import shortLinkRoutes from "./ShortLinkRoutes"

const setupRoutes = (app: Elysia) => {
	app.get("/", () => 'Server is up')
	shortLinkRoutes(app)
}

export default setupRoutes
