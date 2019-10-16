import { Redis } from 'ioredis';

/**
 * This function lock a user account for 2 hours.
 * @param username User id that will be lock
 * @param redis Redis instance to use for set the user lock for some time
 */
const lockAccount = (username: string, redis: Redis): void => {
	redis.set(username, 'LOCK', 'EX', 120 * 60, 'NX');
};

export default lockAccount;
