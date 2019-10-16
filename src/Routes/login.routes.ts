import express, { Request, Response } from 'express';
import passport from 'passport';
import { authLimite } from '@/middlewares/rateLimit';
import UserController from '@/controllers/user';

const routes: express.Router = express.Router();

routes.post('/signup', UserController.create);

routes.post('/login', authLimite, (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, token, info) => {
		if (err || !token) return res.status(400).json({ info });

		req.login(token, { session: false }, err => {
			if (err) return res.status(400).json(err);

			return res.status(200).json({ token });
		});
	})(req, res);
});

routes.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));

routes.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', { session: false, failureRedirect: '/', scope: ['email'] }),
	function (req: Request, res: Response) {
		console.log(req.body);
		res.redirect('/');
	}
);
