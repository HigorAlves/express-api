import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import * as path from 'path';
import hbs from 'express-handlebars';
import Routes from '@/Routes/index';
import Logger from '@/services/logger';
import { limiter, slower } from '@/middlewares/rateLimit';
import { LogWarning, LogSuccess } from '@/helpers';
import { Server, createServer } from 'http';
import { socketIO } from '@/helpers/socket';

export class AppController {
	private app: express.Application;

	private server: Server;

	private io: SocketIO.Server;

	private port: string | number;

	public constructor () {
		this.app = express();
		this.port = process.env.PORT || 4000;
		this.server = createServer(this.app);
		this.io = socketIO.init(this.server);
		this.setEngine();
		this.middlewares();
		this.setRoutes();
		this.listen();
		this.socket();
	}

	private middlewares (): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(slower);
		this.app.use(limiter);
		this.app.use(
			morgan(':date[web] :method :url :status :response-time :remote-addr :remote-user', {
				stream: {
					write: function (meta) {
						Logger.info(meta);
						LogWarning(meta);
					}
				}
			})
		);
	}

	private setEngine (): void {
		this.app.engine(
			'hbs',
			hbs({
				defaultLayout: 'main',
				extname: '.hbs'
			})
		);
		this.app.set('view engine', 'hbs');
		this.app.set('views', path.join(__dirname, 'Views'));
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private setRoutes (): void {
		this.app.use(Routes);
	}

	private listen (): void {
		this.server.listen(this.port, () => {
			LogSuccess('Running server on port ' + this.port);
		});
	}

	private socket (): void {
		const io = socketIO.init(this.server);

		io.on('connection', (socket: any) => {
			socket.on('disconnect', () => console.log('Disconnect'));
		});
	}

	public getApp (): express.Application {
		return this.app;
	}
}

export default new AppController();
