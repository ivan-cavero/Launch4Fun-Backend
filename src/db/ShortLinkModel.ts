import { getClient } from ".";

export const getShortLinksCountFromDb = async () => {
    const client = getClient("shortLinks");
    const result = await client.execute({
        sql: "SELECT COUNT(*) AS count FROM urls",
		args: []
    });
    return result.rows[0].count;
};

export const createShortLinkInDb = async (url: string, shortUrl: string) => {
    const client = getClient("shortLinks");
    await client.execute({
        sql: "INSERT INTO urls (url, short_url) VALUES (?, ?)",
        args: [url, shortUrl]
    });
    return getShortLinkByShortUrl(shortUrl);
};

export const getShortLinkByShortUrl = async (shortUrl: string) => {
    const client = getClient("shortLinks");
    const result = await client.execute({
        sql: "SELECT * FROM urls WHERE short_url = ?",
        args: [shortUrl]
    });
    return result.rows.length ? result.rows[0] : null;
};
