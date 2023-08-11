import { sessionService } from "../services/sessions.services.js"

class SessionController {
    
    async login (req, res) {
        const { email, password } = req.body
        
        try {
            const token = await sessionService.loginUser(email, password)
    
            res.cookie('Authorization', token, {httpOnly: true})
            res.redirect('/views/products')
    
        } catch (error) {
            res.json({error: 'Usuario o contraseña incorrectos'})
        }
    }
    
    async signup (req, res) {
        const user = req.body
        try {
            return await sessionService.signupUser (user) 
                ? res.redirect('/views/login')
                : res.json({error:'Ya existe un usuario registrado con ese mail'})
               
        } catch (error) {
            throw error
        }
    }
    
    async resetPassword (req, res, next) {
        
        try {
            await sessionService.sendResetLink(req.body.email)
            return res.send("En su casilla de mail encontrará el link para resetear usu contraseña")
        
        } catch (error) {
            console.log({error});            
        }
    }

    async updatePassword (req, res, next) {
        const { pass1, pass2 } = req.body
        const { email } = req.user
        try {
            await sessionService.setNewPassword(email, pass1, pass2)
            return res.send("Contraseña cambiada con exito")
        
        } catch (error) {
            console.log({error});            
        }
    }
    /* router.get('/current', async (req, res) {
        try {
            const { authorization } = req.headers
            const validateUser = jwt.verify(authorization, config.secretKeyTkn)
            const user = await userManager.getOneById(validateUser.userID)
            res.send(user)
            
        } catch (error) {
            res.send('Unauthorized')
        }
    }) */
    
    async logout(req, res) {
        res.clearCookie('Authorization')
        res.redirect('/views/login')
    }
}    


export const sessionController = new SessionController()
