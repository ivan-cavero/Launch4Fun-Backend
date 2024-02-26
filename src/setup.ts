import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt';
import { swagger } from '@elysiajs/swagger'
import { serverTiming } from '@elysiajs/server-timing'

export function setup(app: Elysia) {
    app.use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRETS || 'default_secret',
            exp: '7d'
        })
    )
    .use(swagger())
    .use(serverTiming())
}
