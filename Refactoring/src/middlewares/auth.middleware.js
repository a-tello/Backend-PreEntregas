import { jwtValidator } from "./jwt.middleware"

const roleAuthorization = async (role) => {
    return (req, res, next) => {
        if(req.user.role === role){
            next()
        }
        throw new Error('Unauthroized')
    }
}

export const admin = () => roleAuthorization('Admin')
export const user = () => roleAuthorization('User')
export const premium = () => roleAuthorization('Premium')


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