import Passport from 'passport';
import Local from 'passport-local';
import PassportFacebook from 'passport-facebook';
import jwt from 'jsonwebtoken';
import Redis from '@/database/redis';
import { User } from '@/database/model/User';
import secondsToHms from '@/helpers/secondsToHms';

const LocalStrategy = Local.Strategy;
const FacebookStrategy = PassportFacebook.Strategy;

Passport.use(
	new LocalStrategy(async (username, password, done) => {
		const blocked = await Redis.get(username);
		const timeUntilExpire: number = await Redis.ttl(username);

		if (blocked === 'LOCK') {
			const message = `This account is locked. Timeout: ${secondsToHms(timeUntilExpire)}`;
			done(null, false, { message });
		} else {
			User.findOneOrFail({ where: { email: username } })
				.then(res => {
					const token = jwt.sign({ id: res.type }, process.env.JWT_SECRET as string);
					done(null, token, { message: 'Logged In Successfully' });
				})
				.catch(() => done(null, false, { message: 'Username or Password are wrong' }));
		}
	})
);

Passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID as string,
			clientSecret: process.env.FACEBOOK_APP_SECRET as string,
			callbackURL: 'http://localhost:4000/auth/facebook/callback',
			enableProof: true,
			profileFields: ['id', 'displayName', 'first_name', 'last_name', 'email']
		},
		async (accessToken, refreshToken, profile: any, done) => {
			const exist = await User.findOne({ where: { email: profile.emails[0].value } });
			if (exist) {
				done(null);
			} else {
				const user = new User();
				user.firstName = profile._json.first_name;
				user.lastName = profile._json.last_name;
				user.email = profile.emails[0].value;
				await user.save();
				done(null);
			}
		}
	)
);
