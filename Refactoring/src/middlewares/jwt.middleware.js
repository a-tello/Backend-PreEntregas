import jwt from "jsonwebtoken"
import config from "../config.js"
import { userService } from "../services/users.services.js"
import userRes from "../DAL/DTOs/userRes.dto.js"

const tokenFromHeader = (req) => {
    const authHeader = req.get('Authorization')
    const token = authHeader?.split(' ')[1]
    return token
}

export const verifyTokenAdmin = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.isAdmin){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenUser = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(!validateUser.isAdmin){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenPremium = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.role === 'Premium'){
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenPremiumOrAdmin = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.role === 'Premium' || validateUser.isAdmin){
            req.user = {...validateUser}
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 

export const verifyTokenPremiumOrUser = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser.role === 'Premium' || validateUser.role === 'Usuario'){
            req.user = {...validateUser}
            next()
        } else {
            throw new Error
        }
    } catch (error) {
        res.status(401).json({error: 'Unauthorized.'});
    }
} 