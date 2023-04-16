import { productsModel } from "../db/models/products.model.js"

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
    
    async getProducts(limit) {
             
        try {
            if(!limit) return await productsModel.find()

            return await productsModel.find().limit(limit)
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
            const updatedProduct = await productsModel.findByIdAndUpdate(productId, productValues)
            return await productsModel.findById(productId)
        } catch(err) {
            err.message = 'Can not update product. Check ID or fields.'
            err.code = 400
            throw err
        }
    }

    async deleteProductById(productId) {
        
        try {
            const a = await productsModel.findByIdAndDelete(productId)
            return a
        } catch(err) {
            err.message = 'Cannot delete product'
            err.code = 400
            throw err
        }
    }

    async deleteProducts(productId) {
        const products = await this.getProducts()
        const newProductList = products.filter((product) => product.id !== productId)

        await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 4))
    }
}