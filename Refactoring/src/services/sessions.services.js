import { userManager } from "../DAL/DAOs/users/usersMongo.js"
import { generateToken } from "../jwt.utils.js"
import { transporter } from "../nodemailer.js";
import { compareData, hashData } from "../utils.js"
import { cartService } from "./carts.services.js";
import { userService } from "./users.services.js"

const EXPIRATION_TIME_TOKEN = 1200 // 20 minutos
const EXPIRATION_TIME_RESET_TOKEN = 1200 // 20 minutos

class SessionService {
    
    async loginUser (email, password) {
        try {
            if(userService.isAdmin(email, password)) return generateToken({user: {role: 'Admin', isAdmin:true}}, EXPIRATION_TIME_TOKEN)
                
            const user = await userService.getOneUserBy({email})
            
            if (!user.length) throw new Error('Invalid email')
        
            const passwordMatch = await compareData(password, user[0].password);
        
            if (!passwordMatch) throw new Error('Incorrect password')

            await userService.updateLastConnection(email)

            return generateToken({user: {userID: user[0]._id, role: user[0].role}}, EXPIRATION_TIME_TOKEN)
            
        } catch (error) {
            throw error
        }
    }

    async loginGitHub (email) {
        try {
            await userService.updateLastConnection(email)
            const user = await userManager.getOneUserBy({email})

            return generateToken({user: {userID: user[0]._id, role: user[0].role}}, EXPIRATION_TIME_TOKEN)
            
        } catch (error) {
            throw error
        }
    }

    async signupGithub (profile) {
        try {
            const email = profile.email
            
            const registeredUser = await userService.getOneUserBy({email})

            if(registeredUser.length) return await this.loginGitHub(email)

            const firstname = profile.name.split(' ')[0]
            const lastname = profile.name.split(' ')[1]
            const newCart = await cartService.createOne()
            await userManager.createUser({email, firstname, lastname, cart:newCart, role: 'User'})
            
            return await this.loginGitHub(email) 
        } catch (error) {
            throw error
        }
    }
    
    async signupUser (user) {
    
        try {
            const registeredUser = await userService.getOneUserBy({email: user.email})

            if(registeredUser.length) throw new Error('Email already registered')
    
            const hashPassword = await hashData(user.password)
            const newCart = await cartService.createOne()
            const newUser = await userManager.createUser({...user, password: hashPassword, cart:newCart, role: 'User'})
            
            return newUser
        } catch (error) {
            throw error
        }
    }
    
    async sendResetLink (email) {
        const user = await userService.getOneUserBy({email})
        
        if(!user.length) throw new Error('El mail ingresado no corresponde a ningún usuario registrado')
            
        const token = generateToken({user: {userID: user[0]._id, role: user[0].role}}, EXPIRATION_TIME_RESET_TOKEN)
        const linkToken = token.toString()
        await transporter.sendMail({
            from:'AQ Tienda',
            to: user[0].email,
            subject: 'Reseteo de contraseña',
            text: `http://localhost:8080/views/resetPassword?token=${linkToken}`

        })
    }

    async setNewPassword (email, password1, password2) {
        const user = await userService.getOneUserBy({email})
        const match = await compareData(password1, user[0].password)
        
        try {
            if(match) throw new Error('La contraseña no puede coincidir con la anterior. Por favor, cambie su contraseña')
            if(password1 !== password2) throw new Error('Las contraseñas deben coincidir')
            const hashPassword = await hashData(password1)
            await userService.updateUser({_id: user[0]._id}, {password: hashPassword})
            
        } catch (error) {
            throw error
        }
    
    
    }
    
   

}    

export const sessionService = new SessionService()
