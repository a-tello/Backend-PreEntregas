import { usersModel } from '../../mongoDB/models/users.models.js'

export default class UsersManager {
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
}