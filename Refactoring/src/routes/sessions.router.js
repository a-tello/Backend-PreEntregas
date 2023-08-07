import { Router } from "express"
import config from "../config.js"
import jwt from "jsonwebtoken"
import { sessionController } from "../controllers/sessions.controller.js"
import { jwtValidator } from "../middlewares/jwt.middleware.js"
import passport from "passport"
import '../passport/passportStrategies.js'


const router = Router()

router.post('/login', function (req, res, next) {
      passport.authenticate('login', async (err, token, info) => {
        console.log("err: ", err);
        console.log("token: ", token);
        console.log("info: ", info);
        console.log("req: ", req.user);
        res.cookie('Authorization', token, {httpOnly: true})
        
        if (err) {
          console.log('next error');
            //return next(err);
        }
  
        /* if (!user) {
          return res.redirect(`/failed?message=${info.message}`);
        } */
  
        // It doesn't seem like the req.login() does anything for us when using JWT.
        // I could be wrong though. You'll have to play around with it yourself.
        // req.login(user, { session: false }, async (error) => {
        // console.log("using req.login...");
  
        //const token = jwt.sign({ user: body }, "TOP_SECRET");

  
        //return res.redirect(`success?message=${info.message}`);
        // }); // this is the closing brackets for the req.login
        return next()
      })(req, res, next);
    },
    (req, res, next) => {
        res.redirect('/views/products'); // able to add functions after the authenticate call now.
    }
  );

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