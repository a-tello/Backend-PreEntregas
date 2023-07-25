import jwt from "jsonwebtoken"
import config from "../config.js"
import { getOneUserBy } from "../services/users.services.js"

export const jwtValidatorCookie = async (req, res, next) => {
    console.log('jwt');
    try {
        const token = req.cookies.token
        console.log(token);

        if(!token) return next()

        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser) {

            if(validateUser.role === 'Admin') {
                req.user = {
                    firstname: 'Coder',
                    lastname: 'Admin',
                    role: 'Admin',
                    age: ' ',
                    email: ' ',
                    isLogged: true,
                    isAdmin: true
                }
                return next()
            }

            const user = await getOneUserBy({'_id': validateUser.userID})
            req.user = {
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                role: user[0].role,
                age: user[0].age,
                email: user[0].email,
                isLogged: true,
                isAdmin: false
            }
            next()
        }
         
    }catch (err) {
        //throw err
        res.clearCookie('token')
        res.redirect('/views/login')
    }
}

export const jwtValidatorHeader = async (req, res, next) => {
    console.log('jwt');
    try {
        const authHeader = req.get('Authorization')
        const token = authHeader.split(' ')[1]
        console.log('token header: ', token);

        if(!token) return next()

        const validateUser = jwt.verify(token, config.secretKeyTkn)

        if(validateUser) {

            if(validateUser.role === 'Admin') {
                req.user = {
                    firstname: 'Coder',
                    lastname: 'Admin',
                    role: 'Admin',
                    age: ' ',
                    email: ' ',
                    isLogged: true,
                    isAdmin: true
                }
                return next()
            }

            const user = await getOneUserBy({'_id': validateUser.userID})
            req.user = {
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                role: user[0].role,
                age: user[0].age,
                email: user[0].email,
                isLogged: true,
                isAdmin: false
            }
            next()
        }
         
    }catch (err) {
        res.clearCookie('token')
        res.redirect('/views/login')
        throw err
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