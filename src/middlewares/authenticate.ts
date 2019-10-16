import Passport from 'passport';
import PassportJWT from 'passport-jwt';

const JWTStrategy = PassportJWT.Strategy;
const ExtractJWT = PassportJWT.ExtractJwt;

Passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET
		},
		function (jwtPayload, done) {
			// find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

			if (jwtPayload.id === 1) {
				return done(null, { user: 'teste' });
			}
		}
	)
);
