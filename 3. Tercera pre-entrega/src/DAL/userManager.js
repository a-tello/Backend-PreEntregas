import { userModel } from "./models/users.model.js";

export default class UserManager {
   
    async getUserById(id) {
        try {
            const user = userModel.findById(id).lean()
            return user
        } catch (error) {
            throw error            
        }
    }

    async getUser(query) {
        try {
            const user = userModel.find(query).lean()
            return user
        } catch (error) {
            throw error            
        }
    }

    async createOne(user) {
        try {
            const newUser = userModel.create(user)
            return newUser
        } catch (error) {
            throw error
        }
    }
}