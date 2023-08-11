import { userManager } from '../DAL/DAOs/users/usersMongo.js' 
import config from "../config.js"

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
}

export const userService = new UserService()
