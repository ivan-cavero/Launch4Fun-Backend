import { Elysia, t } from "elysia"
import { addClient, removeClient } from '../utils/notifications';
import { getShortLinksCount, createShortLink } from "../controllers/ShortLinkController";

const shortLinkRoutes = (app: Elysia) => {
	app.post(
		"/short-links",
        async (request: Request) => {
            return await createShortLink(request.body.url, request.body.shortUrl);
		},
		{
			body: t.Object(
				{
					url: t.String(),
                    shortUrl: t.String()
				},
				{
					description: "Expected a url"
				}
			),
			detail: {
				summary: "Create a new short link",
				tags: ["short-links"]
			}
		}
	)
    app.get(
        "/short-links/count",
        async () => {
            return getShortLinksCount()
        },
        {
            detail: {
                summary: "Get the number of short links",
                tags: ["short-links"]
            }
        }
    )
    app.ws('/short-links/ws-count', {
        open(ws) {
            addClient(ws);
            getShortLinksCount().then((count) => {
                ws.send(JSON.stringify({ type: 'shortLinksCount', count }));
            });
        },
        close(ws) {
            removeClient(ws);
        },
        message(ws, message) {
            ws.send({
                message,
                time: Date.now()
            });
        }
    });
    
}

export default shortLinkRoutes
