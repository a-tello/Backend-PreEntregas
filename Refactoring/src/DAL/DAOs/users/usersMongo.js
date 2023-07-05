import { usersModel } from '../../mongoDB/models/users.models.js'

export default class UsersManager {
    async getAll(){
        try {
            return await usersModel.find()
        } catch (err) {
            throw err
        }
    }

    async getOne(email){
        try {
            return await usersModel.find({email})
        } catch (err) {
            throw err
        }
    }

    async getOneById(id){
        try {
            return await usersModel.findById(id)
        } catch (err) {
            throw err
        }
    }

    async createOne(obj){
        try {
            return await usersModel.create(obj)
        } catch (err) {
            throw err
        }
    }

    
}