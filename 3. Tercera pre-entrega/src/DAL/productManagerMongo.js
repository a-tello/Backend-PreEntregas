import { productsModel } from "./models/products.model.js"

export default class ProductManager {
    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product)
            return newProduct
        }
        catch(err) {
            err.code = 400
            throw err
        }
    }
    
    async getProducts(query,data ) {
             
        try {
            const products = await productsModel.paginate(query,data)
            return products
        }
        catch(err) {
            err.code = 400
            throw err
        }
    }

    async getProductById(productId) {
        try {
            const product = await productsModel.findById(productId)
            return product
        } catch(err) {
            err.message = `Product with id ${productId} not found`
            err.code = 404
            throw err
        }
        
    }

    async updateProduct(productId, productValues) {
        try {
            await productsModel.findByIdAndUpdate(productId, productValues)
        } catch(err) {
            err.code = 400
            throw err
        }
    }

    async deleteProductById(productId) {
        
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(productId)
            return deleteProduct
        } catch(err) {
            err.code = 400
            throw err
        }
    }
}