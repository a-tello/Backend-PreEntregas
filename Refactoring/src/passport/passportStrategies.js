import passport from 'passport'
import passportJWT from 'passport-jwt'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as JWTstrategy} from 'passport-jwt'
import { sessionService } from '../services/sessions.services.js';
import config from "../config.js"


const tokenFromHeader = (req) => {
    console.log('entra header')
    const authHeader = req.get('Authorization')
    const token = authHeader?.split(' ')[1]
    return token
}

const getJwt = (req) => {
    const token = req.cookies.Authorization || tokenFromHeader(req)
    return token
}


passport.use(new JWTstrategy(
      {
        secretOrKey: config.secretKeyTkn,
        passReqToCallback: true, 
        jwtFromRequest: getJwt
      },
      async (req, token, done) => {
        console.log("in jwt strat. token: ", token);
  
        // 0. Don't even make it through the getJwt function check. NO token
        // prints unauthorized.
  
        // 0B. Invalid token: again doesn't make it into this function. Prints unauthorized
  
        // 1. Makes it into this function but gets App error (displays error message.) no redirecting.
        // We simulate an "application error" occurring in this function with an email of "tokenerror".
        //
        if (token?.user?.email == "tokenerror") {
          let testError = new Error(
            "something bad happened. we've simulated an application error in the JWTstrategy callback for users with an email of 'tokenerror'."
          );
          return done(testError, false);
        }
  
        if (token?.user?.email == "emptytoken") {
          // 2. Some other reason for user to not exist. pass false as user:
          // displays "unauthorized". Doesn't allow the app to hit the next function in the chain.
          // We are simulating an empty user / no user coming from the JWT.
          return done(null, false); // unauthorized
        }
  
        // 3. Successfully decoded and validated user:
        // (adds the req.user, req.login, etc... properties to req. Then calls the next function in the chain.)
        return done(null, token.user);
      }
    )
  );
  
passport.use(
"signup",
new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
    try {
        if (password.length <= 4 || !email) {
        done(null, false, {
            message: "Your credentials do not match our criteria..",
        });
        } else {
        const hashedPass = await bcrypt.hash(password, 10);
        let newUser = { email, password: hashedPass, id: uuidv4() };
        users.push(newUser);
        await fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) return done(err); // or throw err?;
            console.log("updated the fake database");
        });

        done(null, newUser, { message: "signed up msg" });
        }
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
        passReqToCallback: true
    },
    async (req,  email, password, done) => {
    console.log("login named.");
    
    try {
        const userToken = await sessionService.loginUser(email, password)
        return done(null, userToken, { message: "Hey congrats you are logged in!" });
    } catch (error) {
        console.log('error passport');
        return done(error)
    }
    }
));
