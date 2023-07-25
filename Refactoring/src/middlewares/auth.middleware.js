import jwt from "jsonwebtoken"
import config from "../config.js";

const roleAuthorization = (role) => {
    return (req, res, next) => {

        try {

            const authHeader = req.get('Authorization')
            const token = authHeader.split(' ')[1]

            if(!token) throw new Error

            const validateUser = jwt.verify(token, config.secretKeyTkn)

            if(validateUser.role === role) return next()
            throw new Error
        } catch (err) {
            throw new Error(`Unauthroized. Your role should be ${role}`)
        }
    }
}

export const admin = roleAuthorization('Admin')
export const user = roleAuthorization('User')
export const premium = roleAuthorization('Premium')


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