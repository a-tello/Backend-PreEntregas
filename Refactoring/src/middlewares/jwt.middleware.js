import jwt from "jsonwebtoken"
import config from "../config.js"
import UsersManager from "../DAL/DAOs/users/usersMongo.js"

export const jwtValidator = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log({req});

        if(!token) return next()

        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser) {
            const userManager = new UsersManager()
            const user = await userManager.getOneById(validateUser.userID)

            req.user = {
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                age: user.age,
                email: user.email,
                isLogged: true
            }
            next()
        } 
    } catch (error) {
        throw a
    }
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