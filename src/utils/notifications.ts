import { WebSocket as StandardWebSocket } from 'ws';

declare module 'elysia' {
  export type WebSocket = StandardWebSocket;
}

const wsClients = new Set<WebSocket>();

export const addClient = (client: WebSocket): void => {
 wsClients.add(client);
};

export const removeClient = (client: WebSocket): void => {
 wsClients.delete(client);
};

export const notifyClients = (data: object): void => {
    for (const client of wsClients) {
        client.send(JSON.stringify({ type: 'shortLinksCount', ...data }));

    }
};
