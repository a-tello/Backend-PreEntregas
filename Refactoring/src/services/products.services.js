import { productManager } from "../DAL/DAOs/products/productsMongo.js"

class ProductService {
    async getAll (query, params) {
        try {
            const products = await productManager.getAll(query, params)
            return {
                status: 'success',
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
            return {
                status: 'error',
                msg: err
            }
        }
    }
    
    async getOneById (id) {
        try {
            return await productManager.getOneById(id)
        } catch (err) {
            throw err
        }
    }
    
    async createOne (product) {
        try {
            return await productManager.createOne(product)
        } catch (err) {
            throw err
        }
    }
    
    async updateOne (id, data) {
        try {
            return await productManager.updateOne(id, data, {new:true})
        } catch (err) {
            throw err
        }
    }
    
    async deleteOne (id) {
        try {
            return await productManager.deleteOne(id)
        } catch (err) {
            throw err
        }
    }
}

export const productService = new ProductService()
