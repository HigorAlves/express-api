import { Response, Request, NextFunction } from 'express';
import Redis from '@/database/redis';
import secondsToHms from '@/helpers/secondsToHms';

const verifyLockAccount = async (req: Request, res: Response, next: NextFunction) => {
	const { username } = req.body;
	const data: string = (await Redis.get(username)) as string;
	const timeUntilExpire: number = await Redis.ttl(username);

	if (data === 'LOCK') {
		return res.status(423).json({ message: 'This account is locked.', timeout: secondsToHms(timeUntilExpire), error: false });
	}

	next();
};

export default verifyLockAccount;
