import { Router } from "express"
import { loginUser, logoutUser, singUpUser } from '../controllers/users.controller.js'
import passport from "passport"

const router = Router()

router.post('/login', loginUser)

router.post('/signup', singUpUser)

router.get('/signup/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github',  passport.authenticate('github', {
    successRedirect: '/views/products'
}))

router.get('/logout', logoutUser)


export default router