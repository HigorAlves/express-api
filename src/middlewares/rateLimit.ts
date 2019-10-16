import RateLimit from 'express-rate-limit';
import SlowDown from 'express-slow-down';
import { requests } from '@/config';

export const limiter = new RateLimit({
	windowMs: requests.rateLimit.window,
	max: requests.rateLimit.max
});

export const slower = SlowDown({
	windowMs: requests.slowDown.window,
	delayAfter: requests.slowDown.delayAfter,
	delayMs: requests.slowDown.delayMs
});

export const authLimite = new RateLimit({
	windowMs: requests.rateLimitAuth.window,
	max: requests.rateLimitAuth.max,
	onLimitReached: requests.rateLimitAuth.onLimitReached,
	message: requests.rateLimitAuth.message,
	statusCode: requests.rateLimitAuth.statusCode
});
