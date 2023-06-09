import jwt from 'jsonwebtoken'
import config from './config.js'

const secretKeyJWT = config.secretKeyTkn

export const generateToken = (user) => {
    const tkn = jwt.sign(user, secretKeyJWT)
    return tkn
}