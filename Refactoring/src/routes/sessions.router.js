import { Router } from "express"
import { sessionController } from "../controllers/sessions.controller.js"
import passport from "passport"
import '../passport/passportStrategies.js'


const router = Router()

router.post('/login', function (req, res, next) {
      passport.authenticate('login', async (err, token, info) => {
        console.log("err: ", err);
        console.log("token: ", token);
        console.log("info: ", info);
        res.cookie('Authorization', token, {httpOnly: true})
        
        if (err) {
          console.log('next error');
        }

        return next()
      })(req, res, next)
    },
    (req, res, next) => {
        res.redirect('/views/products')
    }
  )

router.post('/signup', passport.authenticate('signup', {session: false}), async (req, res) => {
    res.redirect('/views/login')
})

/* router.get('/current', jwtValidator, async (req, res) => {
    try {
        res.json(req.user)
        
    } catch (error) {
        res.send('Unauthorized')
    }
}) */
router.get('/logout', sessionController.logout)

export default router