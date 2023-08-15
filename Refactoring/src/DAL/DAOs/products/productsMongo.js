import { productsModel } from '../../mongoDB/models/products.model.js'

class ProductManager {
    async getAll(query, params){
        try {
            return await productsModel.paginate(query, params) 
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

    async updateOne(id, action, options) {
        try {
            return await productsModel.findByIdAndUpdate(id, action, options)
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

export const productManager = new ProductManager()