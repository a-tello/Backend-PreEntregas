import jwt from "jsonwebtoken"
import config from "../config.js";
import passport from "passport";

export const roleAuthorization =  (...roles) => {
    return (req, res, next) => {
        const matchRole = roles.includes(req.user.role)
        if(!matchRole) return res.send('Unauthorized')
        return next()
    }
}
export const jwtValidation =  (req, res, next) => {
        passport.authenticate('jwt', {session:false}, async (err, user, info) => {
        console.log({err});
        console.log({info});
        console.log({user});
        if(info) return next()
        if(!user) {console.log('entra al redirect del validation');return res.redirect('/')}

        req.user = user
        console.log('req.user', user);
        return next()
    })(req, res, next)
}


/* export const admin = roleAuthorization('Admin')
export const user = roleAuthorization('User')
export const premium = roleAuthorization('Premium') */


const isNotAuthorized = async (URL) => {
    try {
    } catch (error) {
        
    }
    return (req, res, next) => {
        if(req.user){
            next()
        }
        return res.redirect(URL)
    }
}