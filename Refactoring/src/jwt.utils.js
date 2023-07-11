import jwt from 'jsonwebtoken'
import config from "./config.js"

const secretKeyJWT = config.secretKeyTkn

export const generateToken = (user, exp=null) => {
    if(exp) {
        return jwt.sign(user, secretKeyJWT, {expiresIn:exp})
    }
    return jwt.sign(user, secretKeyJWT)
}
