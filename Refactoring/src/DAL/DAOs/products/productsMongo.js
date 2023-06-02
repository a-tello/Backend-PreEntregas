import { productsModel } from '../../mongoDB/models/products.model.js'

export default class ProductsManager {
    async getAll(){
        try {
            return await productsModel.find()
        } catch (err) {
            throw err
        }
    }

    async getOneById(id){
        try {
            return await productsModel.findById(id)
        } catch (err) {
            throw err
        }
    }

    async createOne(obj){
        try {
            return await productsModel.create(obj)
        } catch (err) {
            throw err
        }
    }

    async updateOne(id, data) {
        try {
            return await productsModel.findByIdAndUpdate(id, data, {new:true})
        } catch (err) {
            throw err
        }
    }

    async deleteOne(id){
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (err) {
            throw err
        }
    }
}