import { productsModel } from '../../mongoDB/models/products.model.js'

export default class ProductsManager {
    async getAll(query, params){
        try {
            const products = await productsModel.paginate(query, params)
            return {
                status: 'sucess',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: `localhost:8080/products/`,
                nextLink: `localhost:8080/products/`
            }
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