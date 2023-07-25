import { generateToken } from "../jwt.utils.js"
import { compareData, hashData } from "../utils.js"
import { createUser, getOneUserBy, isAdmin } from "./users.services.js"

export const loginUser = async (email, password) => {
    try {

        if(isAdmin(email, password)){
            return generateToken({role: 'Admin'}, '1h')
        }
            
        const user = await getOneUserBy({email})

        if(user && await compareData(password, user[0].password)){
            return generateToken({userID: user[0]._id, role: user[0].role}, '1h')
        }

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


