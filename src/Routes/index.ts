import express, { Request, Response } from 'express';
import passport from 'passport';
import VerifyLockAccount from '@/middlewares/verifyLockAccount';
import { requests } from '@/config';
import multer = require('multer');

const routes: express.Router = express.Router();

routes.get('/', (req: Request, res: Response): void => {
	return res.render('index', { title: 'Express API' });
});

routes.post('/upload', multer(requests.multer).single('image'), (req: Request, res: Response) => {
	console.log(req.body.file);
	return res.send('UPLOAD');
});

routes.get(
	'/dashboard',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	VerifyLockAccount,
	(request: Request, response: Response): void => {
		return response.render('dashboard', { title: 'Dashboard' });
	}
);

routes.use((request, response) => {
	response.render('404', { title: '404 Not Found' });
});

export default routes;
