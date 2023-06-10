import passport from 'passport'
import { Strategy as GitHubStrategy} from 'passport-github2'
import config from '../config.js'

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
