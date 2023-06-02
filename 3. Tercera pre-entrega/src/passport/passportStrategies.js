import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as GitHubStrategy} from 'passport-github2'
import { createUser, getUserById, loginUser } from '../services/users.services.js'
import config from '../config.js'


passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true 
    }, async (req, email, password, done) => {

        const user = await loginUser(req.body)
        return user ? done(null, user) : done(null, false)

    }
)) 

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true 
    }, async (req, email, password, done) => {

        const newUser = await createUser(req.body)
        return newUser ? done(null, newUser) : done(null, false)
        
    }
)) 

passport.use('github', new GitHubStrategy({
        clientID: config.github_clientID,
        clientSecret: config.github_client_secret,
        callbackURL: "http://localhost:8080/api/users/github"
    },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
            firstName: profile._json.name.split(' ')[0] || ' ',
            lastName: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email || ' ',
            password: ' ',
            age: 0  ,
            role: 'Usuario'
        }
        const newUser = await createUser(user)

        return done(null, newUser);
        })
    )


  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async(userId, done) => {
    const user = await getUserById(userId)
    done(null, user)

  })
  