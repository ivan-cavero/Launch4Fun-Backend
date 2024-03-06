import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { serverTiming } from '@elysiajs/server-timing'
import { cors } from '@elysiajs/cors'

export function setup(app: Elysia) {
    app
    .use(swagger())
    .use(serverTiming())
    .use(cors())
}
