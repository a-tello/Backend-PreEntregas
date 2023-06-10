import UserManager from "../DAL/DAO/userManager.js"
import CartManager from "../DAL/DAO/cartManagerMongo.js"
import UsersRes from "../DAL/DTOs/usersRes.js"
import { hashData, compareData} from "../utils.js"
import config from '../config.js'
import { generateToken } from "../jwt.utils.js"

const userAdmin = {
    _id:0, 
    firstName: ' ', 
    lastName: ' ', 
    age: '', 
    email: config.admin_email, 
    password: config.admin_password,
    cart:'', 
    role: 'Administrador'
}

const userManager = new UserManager()
const cartManager = new CartManager()


export const getUserById = async (id) => {
    try {
        if(id === 999) return userAdmin
        const user = await userManager.getUserById(id)
        const userRes = new UsersRes(user)
        return userRes
    } catch (error) {
        
    }
}

export const getUser = async (query) => {
    try {
        const user = await userManager.getUser(query)
        const userRes = new UsersRes(user)
        return userRes
    } catch (error) {
        
    }
}

export const createUser = async (user) => {
    try {
        const {email, password} = user
        const userExists = await userManager.getUser({email})
    
        if(userExists.length !== 0) {
            return null
        } else {
            const cart = await cartManager.addCart()
            const hashPassword = await hashData(password)
            const userData = {...user, password: hashPassword, cart: cart._id}
            const newUser = await userManager.createOne({...userData, role: 'Usuario'})
            return newUser
        }
    } catch (error) {
        throw error
    }
}

export const login = async (userData) => {
    const {email, password} = userData

    if(await isAdmin(email,password)) {
        const admin = new UsersRes(userAdmin)
        return generateToken({...admin, isAdmin: true})
    }

    const user = await userManager.getUser({email}) 

    if(user.length !== 0 && await compareData(password, user[0].password)) {
        const userRes = new UsersRes(...user)
        const token = generateToken({...userRes, isAdmin: false})
        return token
    }
    

}
const isAdmin = async (email, password) => {
    return email === config.admin_email && password === config.admin_password
}