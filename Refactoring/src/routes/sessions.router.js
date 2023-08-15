import '../passport/passportStrategies.js'
import passport from "passport"

import { Router } from "express"
import { sessionController } from "../controllers/sessions.controller.js"
import { jwtValidation } from "../middlewares/auth.middleware.js"


const router = Router()

router.post('/login', sessionController.login, (req, res, next) => {
    res.redirect('/views/products')})

router.get('/login/github',passport.authenticate('github', { scope: [ 'user:email' ], session:false }));

router.get('/github', sessionController.loginGithub ,(req, res, next) => {
    res.redirect('/views/products')})

router.post('/signup', sessionController.signup, async (req, res) => {
    res.redirect('/views/login')})

router.post('/resetPassword', sessionController.resetPassword)

router.post('/changePassword', jwtValidation, sessionController.updatePassword)

router.get('/logout', jwtValidation, sessionController.logout)

router.get('/current', jwtValidation, sessionController.current)

export default router