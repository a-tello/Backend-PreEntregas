import { Router } from "express"
import config from "../config.js"
import jwt from "jsonwebtoken"
import { sessionController } from "../controllers/sessions.controller.js"
import { jwtValidator } from "../middlewares/jwt.middleware.js"


const router = Router()

router.post('/login', sessionController.login)

router.post('/signup', sessionController.signup)

router.get('/current', jwtValidator, async (req, res) => {
    try {
        res.json(req.user)
        
    } catch (error) {
        res.send('Unauthorized')
    }
})
router.get('/logout', sessionController.logout)

export default router