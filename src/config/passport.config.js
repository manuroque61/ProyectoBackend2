import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

export default function initializePassport() {
  // Estrategia Local (email + password)
  passport.use('local', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await new UsersRepository().getUserByEmail(email);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Estrategia JWT
  passport.use('jwt', new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.jwt,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await new UsersRepository().getUserById(jwtPayload.id);
        return done(null, user || false);
      } catch (error) {
        return done(error);
      }
    }
  ));
}