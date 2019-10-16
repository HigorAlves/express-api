import { v4 } from 'uuid';
import { Redis } from 'ioredis';

/**
 * Create a confirmation link that expires in 2 hours
 *
 * Returns a URL with the confirmation
 * @param userId The user ID
 * @param url	The host URL
 * @param redis A redis instance
 */
const createConfirmationLink = async (userId: string, url: string, redis: Redis): Promise<string> => {
	const id = v4();
	await redis.set(id, userId, 'EX', 60 * 60 * 2);
	return `${url}/confirm/${id}`;
};

export default createConfirmationLink;
