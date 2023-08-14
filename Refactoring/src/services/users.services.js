import { userManager } from '../DAL/DAOs/users/usersMongo.js' 
import userRes from '../DAL/DTOs/userRes.dto.js'
import config from "../config.js"
import { generateToken } from '../jwt.utils.js'

const EXPIRATION_TIME_TOKEN = 600
const INACTIVITY_TIME = 2592000000

const adminUser = {
    firstname: 'Admin',
    lastname: 'Coder',
    role: 'Admin',
    email: config.admin_email,
}

class UserService {
    
    async getAllUsers (filter={}) {
        try {
            const usersDB = await userManager.getAllUsers(filter)
            const users = []
            usersDB.forEach(user => {
                const userResp = new userRes(user)
                users.push({...userResp, id:user._id})
            })
            return users
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

    async deleteUser (id) {
        console.log('remove service');
        console.log({id});
        try {
            return await userManager.deleteOne(id)
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
        const user = await userManager.getOneUserBy({email})
        await userManager.updateUser({_id:user[0]._id}, {$set: {last_connection: Date.now()}})
    }

    async removeInactiveUsers() {
        try {
            const users = await userManager.getAllUsers({})
            let removedUsers = []
            for(const user of users){
                if(user.last_connection - Date.now() > INACTIVITY_TIME) {
                    const username = user.firstname[0].toUpperCase() + user.lastname.toUpperCase()
                    removedUsers.push(username)
                    await userManager.deleteOne({_id: user._id})
                }
            }
        } catch (error) {
            throw error
        }
    }
}

export const userService = new UserService()
