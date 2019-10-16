import { Request } from 'express';
import lockUserAccount from '@/utils/lockAccount';
import Redis from '@/database/redis';
import Logger from '@/services/logger';
import multer = require('multer');

export const requests = {
	rateLimit: {
		// minutes / seconds / ms
		window: 15 * 60 * 1000,
		max: 250
	},
	slowDown: {
		// minutes / seconds / ms
		window: 15 * 60 * 1000,
		delayAfter: 100,
		delayMs: 500
	},
	rateLimitAuth: {
		// minutes / seconds / ms
		window: 15 * 60 * 1000,
		max: 3,
		message: 'Too many login attempts, for security now your user is locked for 2 hours',
		statusCode: 423,
		onLimitReached: (req: Request, res: any, option: any) => {
			const { username } = req.body;
			lockUserAccount(username, Redis);
			Logger.info(`${new Date()} ${req.method} ${req.originalUrl} ${req.ip} | User: ${username} have account locked`);
		}
	},
	multer: {
		// Use this only if we dont use online like GCP Bucket
		storage: multer.diskStorage({
			destination: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
				cb(null, '/images');
			},
			filename: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
				cb(null, file.filename + '-' + file.originalname);
			}
		}),
		filefilter: (req: Request, file: Express.Multer.File, cb: Function) => {
			if (file.mimetype === 'images/png' || file.mimetype === 'images/jpg' || file.mimetype === 'images/jpeg') {
				cb(null, true);
			} else {
				cb(null, false);
			}
		}
	}
};
