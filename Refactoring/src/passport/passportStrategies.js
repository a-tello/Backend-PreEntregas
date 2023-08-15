import passport from 'passport'
import config from "../config.js"
import userRes from '../DAL/DTOs/userRes.dto.js';

import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as JWTstrategy} from 'passport-jwt'
import { Strategy as GitHubStrategy} from 'passport-github2'
import { sessionService } from '../services/sessions.services.js';
import { userService } from '../services/users.services.js';


const tokenFromHeader = (req) => {
    const authHeader = req.get('Authorization')
    const token = authHeader?.split(' ')[1]
    return token
}

const getJwt = (req) => {    
    const token = tokenFromHeader(req) || req.cookies?.Authorization 
    return token
}

passport.use(new JWTstrategy(
      {
        secretOrKey: config.secretKeyTkn,
        jwtFromRequest: getJwt
      },
      async (token, done) => {


        if (!token){
            const err = new Error('Forbidden')
            return done(err, false)
        } 
        if(token.user.role === 'Admin') return done(null, {role:'Admin', isLogged: true, isAdmin: true})

        const user = await userService.getOneUserBy({_id: token.user.userID})
        const userResp = new userRes(user[0])

        return done(null, {...userResp, isLogged: true});
      }
    )
  );
  
passport.use("signup", new LocalStrategy(
    { 
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true 
    },
    async (req, email, password, done) => {
        try {
            const newUser = await sessionService.signupUser(req.body)

            done(null, newUser, { message: "signed up msg" });
        } catch (err) {
            return done(err);
        }
    }
)
);
  
passport.use('login', new LocalStrategy(
    { 
        usernameField: "email", 
        passwordField: "password",
    },
    async (email, password, done) => {
    
    try {
        const userToken = await sessionService.loginUser(email, password)
        return done(null, userToken, { message: "Hey congrats you are logged in!" });
    } catch (error) {
        return done(error)
    }
    }
))

passport.use('github', new GitHubStrategy(
    {
        clientID: config.github_clientID,
        clientSecret: config.github_client_secret,
        callbackURL: "http://localhost:8080/api/sessions/github"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userToken = await sessionService.signupGithub(profile._json)
        return done(null, userToken, { message: "Hey congrats you are logged in!" });
    } catch (error) {
        return done(error)
    }
    })
)



