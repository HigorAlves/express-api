import { getConnectionOptions, createConnection } from 'typeorm';
import { LogError } from '@/helpers';

export const databaseConnection = async () => {
	try {
		const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
		return createConnection({ ...connectionOptions, name: 'default' });
	} catch (e) {
		return LogError(e);
	}
};
