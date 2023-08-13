import { userManager } from '../DAL/DAOs/users/usersMongo.js' 
import config from "../config.js"
import { generateToken } from '../jwt.utils.js'

const EXPIRATION_TIME_TOKEN = 600


const adminUser = {
    firstname: 'Admin',
    lastname: 'Coder',
    role: 'Admin',
    email: config.admin_email,
}

class UserService {
    
    async getAllUsers (filter={}) {
         try {
            return await userManager.getAllUsers(filter)
        } catch (err) {
            throw err
        }
    }
    
    async getOneUserBy (filter) {
        try {
            return await userManager.getOneUserBy(filter)
        } catch (err) {
            throw err
        }
    }
    
    async createUser (obj) {
        try {
            return await userManager.createUser(obj)
        } catch (err) {
            throw err
        }
    }

    async updateUser (filter, action) {
        try {
            return await userManager.updateUser(filter, action)
        } catch (err) {
            throw err
        }
    }
    
    isAdmin (email, password) {
        return email === config.admin_email && password === config.admin_password   
    }

    async changeRole(email, role) {
        try {
            const user = await userManager.getOneUserBy({email})
            
            const newRole = role === 'User'
                ? 'Premium'
                : 'User'
            await userManager.updateUser({email}, {role: newRole})
            const token = generateToken({user: {userID: user[0]._id, role: user[0].role}}, EXPIRATION_TIME_TOKEN)
            return token
        } catch (error) {
            throw error
        }
    }
        
    async addDocumentsToUser (uid, files) {
        try {
            for(let file of files['docs']){
                await userManager.updateOne(uid, {$push:{"documents":{name: file.originalname , reference:file.filename}}})
            }
            return
        } catch (err) {
            throw err        
        }
    }

    async updateLastConnection (email) {
        const user = await getUser({email: userEmail})
        await updateUser({_id:user[0]._id}, {$set: {last_connection: Date.now()}})
    }
}

export const userService = new UserService()
