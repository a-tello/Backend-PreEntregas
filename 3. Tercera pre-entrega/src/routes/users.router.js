import { Router } from "express"
import { logoutUser } from '../controllers/users.controller.js'
import passport from "passport"

const router = Router()

router.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/views/error',
    failureMessage: `El mail ya se encuentra registrado`,
    successRedirect: '/views/login',
    session:false
}))
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/views/error',
    failureMessage: 'Usuario o contraseña incorrectos',
    successRedirect: '/views/products'  
}))

router.get('/signup/github',passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github',  passport.authenticate('github', {
    successRedirect: '/views/products'
}))

router.get('/logout', logoutUser)


export default router