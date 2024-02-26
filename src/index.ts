import { Elysia } from "elysia"
import setupRoutes from "./routes"
import { setup } from "./setup"

const app = new Elysia()

setup(app)

setupRoutes(app)

const start = () => {
	const PORT = process.env.PORT || 3000
	app.listen(PORT)
	console.log(`Server is running at http://${app.server?.hostname}:${PORT}`)
}

start()

export { app }
