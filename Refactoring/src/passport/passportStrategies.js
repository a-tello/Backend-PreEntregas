import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as JWTstrategy} from 'passport-jwt'
import { sessionService } from '../services/sessions.services.js';
import config from "../config.js"
import { userService } from '../services/users.services.js';
import userRes from '../DAL/DTOs/userRes.dto.js';


const tokenFromHeader = (req) => {
    const authHeader = req.get('Authorization')
    const token = authHeader?.split(' ')[1]
    return token
}

const getJwt = (req) => {
    const token = req.cookies.Authorization || tokenFromHeader(req)
    console.log('VERIFIED:', token);
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
        console.log({token});
        if(token.user.role === 'Admin') return done(null, {role:'Admin', isLogged: true})

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


