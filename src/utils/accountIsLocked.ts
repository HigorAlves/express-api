import { Redis } from 'ioredis';
import secondsToHms from '@/helpers/secondsToHms';

/**
 * Verify if one user is blocked to login in the platform
 * @param user Username of the user
 * @param redis A Redis instance
 */
const accountIsLocked = async (user: string, redis: Redis): Promise<string | boolean> => {
	const isBlocked = await redis.get(user);
	const timeUntilExpireBlock = await redis.ttl(user);

	if (isBlocked === 'LOCK') return `This account is locked. Timeout: ${secondsToHms(timeUntilExpireBlock)}`;

	return false;
};

export default accountIsLocked;
