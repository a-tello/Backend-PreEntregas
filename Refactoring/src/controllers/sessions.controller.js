import passport from "passport";
import { sessionService } from "../services/sessions.services.js"

class SessionController {
    
    async login (req, res, next) {
            passport.authenticate('login', async (err, token, info) => {
              console.log("err: ", err);
              console.log("token: ", token);
              console.log("info: ", info);
              res.cookie('Authorization', token, {httpOnly: true})
            
              
              if (err) {
                return res.render('error', {error: err.message})
              }
      
              return next()
            })(req, res, next)
    }  

    async signup (req, res, next) {
            passport.authenticate('signup', {session: false}, async (err, token, info) => {
              res.cookie('Authorization', token, {httpOnly: true})
            
              
              if (err) {
                return res.render('error', {error: err.message})
              }
      
              return next()
            })(req, res, next)
    }  

    async loginGithub (req, res, next) {
        passport.authenticate('github', async (err, token, info) => {
            res.cookie('Authorization', token, {httpOnly: true})
            
            if (err) {
            console.log('next error');
            }
    
            return next()
        })(req, res, next)
    }
        

    async resetPassword (req, res, next) {
        
        try {
            await sessionService.sendResetLink(req.body.email)
            return res.render('success', {msg:"En su casilla de mail encontrará el link para resetear su contraseña"})
        
        } catch (err) {
            return res.render('error', {error: err.message})            
        }
    }

    async updatePassword (req, res) {
        const { pass1, pass2 } = req.body
        const { email } = req.user
        try {
            await sessionService.setNewPassword(email, pass1, pass2)
            res.clearCookie('Authorization')
            return res.render('success', {msg:"Contraseña cambiada con exito"})
        
        } catch (err) {
            return res.render('error', {error: err.message})            
        }
    }

    async logout(req, res) {
        res.clearCookie('Authorization')
        res.redirect('/views/login')
    }
}    


export const sessionController = new SessionController()
