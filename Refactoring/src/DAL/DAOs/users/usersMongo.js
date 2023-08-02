import { usersModel } from '../../mongoDB/models/users.models.js'

class UserManager {
    async getAllUsers(filter){
        try {
            return await usersModel.find(filter)
        } catch (err) {
            throw err
        }
    }

    async getOneUserBy(filter){
        try {
            return await usersModel.find(filter)
        } catch (err) {
            throw err
        }
    }

    async createUser(obj){
        try {
            return await usersModel.create(obj)
        } catch (err) {
            throw err
        }
    }    

    async deleteOne(id) {
        try {
            return await usersModel.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }
}

export const userManager = new UserManager()