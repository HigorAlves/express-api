import 'module-alias/register';
import 'reflect-metadata';
import 'dotenv/config';
import '@/services/passport';
import '@/middlewares/authenticate';

import AppController from '@/app';
import { LogError } from '@/helpers/index';
import { databaseConnection } from '@/database';
import Logger from '@/services/logger';

export const startServer = async () => {
	try {
		await databaseConnection();
		AppController.getApp();
	} catch (e) {
		LogError(e);
		Logger.error(e);
	}
};

startServer();
