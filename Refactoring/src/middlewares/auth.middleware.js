import jwt from "jsonwebtoken"
import config from "../config.js";
import passport from "passport";


 export const roleAuthorization =  (req, res, next) => {
    passport.authenticate('jwt', {session:false}, async (err, user, info) => {
      if(!user) return res.redirect('/')
      
      
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