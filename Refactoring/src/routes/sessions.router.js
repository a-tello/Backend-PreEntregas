import { Router } from "express"
import UsersManager from "../DAL/DAOs/users/usersMongo.js"
import { compareData, hashData } from "../utils.js"
import config from "../config.js"

const router = Router()
const userManager = new UsersManager()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if(email === config.admin_email && password === config.admin_password) {
            res.cookie('User', {
                firstname: 'Admin',
                lastname: 'Coder',
                role: 'Administrador',
                email: config.admin_email,
                isAdmin: true   
            })
            return res.redirect('/views/products')
        }


        const user = await userManager.getOne(email)
        if(user && await compareData(password, user[0].password)){
            
        }
        throw new Error
    } catch (error) {
        res.json({error: 'Usuario o contraseña incorrectos'})
    }
})

router.post('/signup', async (req, res) => {
    const user = req.body
    try {
        const registeredUser = await userManager.getOne(user.email)
        
        if(registeredUser.length) return res.json({error:'Ya existe un usuario registrado con ese mail'})

        const hashPassword = await hashData(user.password)
        await userManager.createOne({...user, password: hashPassword, cart:'1152122'})
        
        return res.redirect('/views/login')
    } catch (error) {
        throw error
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie('User')
    return res.redirect('/views/login')
})

export default router