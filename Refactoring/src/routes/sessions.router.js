import { Router } from "express"
import UsersManager from "../DAL/DAOs/users/usersMongo.js"
import config from "../config.js"
import { jwtValidator } from "../middlewares/jwt.middleware.js"
import jwt from "jsonwebtoken"
import { login, logout, signup } from "../controllers/sessions.controller.js"


const router = Router()
const userManager = new UsersManager()

router.post('/login', login)

router.post('/signup', signup)

/* router.get('/current', async (req, res) => {
    try {
        const { authorization } = req.headers
        const validateUser = jwt.verify(authorization, config.secretKeyTkn)
        const user = await userManager.getOneById(validateUser.userID)
        res.send(user)
        
    } catch (error) {
        res.send('Unauthorized')
    }
})
 */
router.get('/logout', logout)

export default router