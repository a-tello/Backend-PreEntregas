import { compareData, hashData } from "../utils.js"
import { createUser, getOneUserBy, isAdmin } from "./users.services.js"

export const loginUser = async (email, password) => {
    try {
        let token

        if(isAdmin(email, password)){
            token = generateToken({role: 'Admin'})
        }
            
        const user = await getOneUserBy(email)

        if(user && await compareData(password, user[0].password)){
            token = generateToken({userID: user[0]._id})
        }

        return token

    } catch (error) {
        throw error
    }
}

export const signupUser = async (user) => {

    try {
        const registeredUser = await getOneUserBy(user.email)
        
        if(registeredUser.length) return false

        const hashPassword = await hashData(user.password)
        await createUser({...user, password: hashPassword, cart:'1152122'})
        
        return true
    } catch (error) {
        throw error
    }
}

/* router.get('/current', async (req, res) => {
    try {
        const { authorization } = req.headers
        const validateUser = jwt.verify(authorization, config.secretKeyTkn)
        const user = await userManager.getOneById(validateUser.userID)
        res.send(user)
        
    } catch (error) {
        res.send('Unauthorized')
    }
}) */


