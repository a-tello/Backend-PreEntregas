
import passport from "passport";

export const roleAuthorization =  (...roles) => {
    return (req, res, next) => {
        const matchRole = roles.includes(req.user.role)
        if(!matchRole) return res.status(401).json({error: 'Unauthorized'})
        return next()
    }
}
export const jwtValidation =  (req, res, next) => {
        passport.authenticate('jwt', {session:false}, async (err, user, info) => {
        if(info?.message === 'No auth token') {
            req.user = {isLogged:false}
            return next()
        }

        req.user = user
        return next()
    })(req, res, next)
}