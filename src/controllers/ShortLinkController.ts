import { getShortLinksCountFromDb, createShortLinkInDb } from "../db/ShortLinkModel";
import { notifyClients } from '../utils/notifications';

export const getShortLinksCount = async () => {
	try {
		const shortLinksCount = await getShortLinksCountFromDb()

        return  shortLinksCount
	} catch (error) {
		console.error(error)
        throw error
	}
}

export const createShortLink = async (url: string, shortUrl: string) => {
    if (!url || !shortUrl) {
        throw new Error('URL and shortUrl are required.');
    }
    try {
        const result = await createShortLinkInDb(url, shortUrl);
        if (!result) {
            throw new Error('Unable to create short link.');
        }
        
        const { id, ...shortLinkData } = result;
        notifyClients({ count: await getShortLinksCountFromDb() });

        return shortLinkData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};