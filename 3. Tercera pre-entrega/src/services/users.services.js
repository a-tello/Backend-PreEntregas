import UserManager from "../DAL/userManager.js"
import { hashData, compareData} from "../utils.js"
import config from '../config.js'
import CartManager from "../DAL/cartManagerMongo.js"

const userAdmin = {
    _id:999, 
    firstName: 'Admin', 
    lastName: '-', 
    age: '-', 
    email: 'adminCoder@coder.com', 
    password: 'adminCod3r123', 
    role: 'Administrador'
}

const userManager = new UserManager()
const cartManager = new CartManager()

export const getUserById = async (id) => {
    try {
        if(id === 999) return userAdmin
        const user = await userManager.getUserById(id)
        return user
    } catch (error) {
        
    }
}

export const getUser = async (query) => {
    try {
        const user =await userManager.getUser(query)
        return user
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

export const loginUser = async (userData) => {
    const {email, password} = userData
    if(await isAdmin(email,password)) return userAdmin

    const user = await userManager.getUser({email})
    return (user.length !== 0 && await compareData(password, user[0].password)) ? {...user[0]} :  null
}

const isAdmin = async (email, password) => {
    return email === config.admin_email && password === config.admin_password
}