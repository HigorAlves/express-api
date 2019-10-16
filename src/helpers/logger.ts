import { Request, Response, NextFunction } from 'express';
import Winston from '@/services/logger';

const logger = (req: Request, res: Response, next: NextFunction) => {
	Winston.info(`Date: ${new Date()} | ${req.method} ${req.originalUrl} | IP: ${req.ip} `);
	next();
};

export default logger;
