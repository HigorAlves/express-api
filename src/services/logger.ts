import winston from 'winston';

const options = {
	error: {
		filename: 'logs/error.log',
		level: 'error',
		maxsize: 5242880,
		json: true,
		handleExceptions: true,
		colorize: false
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true
	},
	info: {
		filename: 'logs/info.log',
		level: 'info',
		maxsize: 5242880,
		json: true,
		handleExceptions: true,
		colorize: false
	}
};

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File(options.error),
		new winston.transports.File(options.info),
		new winston.transports.File({ filename: 'logs/all.log' })
	],
	exitOnError: false
});

export default logger;
