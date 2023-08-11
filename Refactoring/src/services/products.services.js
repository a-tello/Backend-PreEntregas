import { cartManager } from "../DAL/DAOs/carts/cartsMongo.js"
import { productManager } from "../DAL/DAOs/products/productsMongo.js"
import { cartService } from "./carts.services.js"

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

    async isAvailable (id, quantity) {
        const product = await productManager.getOneById(id)
        return product.stock >= quantity
    }

    async getAvailableProducts (cartID) {
        const getCart = await cartService.getCartById({_id:cartID})
        const availableProducts = getCart.products.filter(product => product.product.stock >= product.quantity )
        
        for(let product of availableProducts) {
            await cartService.deleteProductFromCart(cartID, product.product._id)
            const newStock = product.product.stock - product.quantity
            await productManager.updateOne(product.product._id, {stock: newStock})
        }

        return availableProducts
    }
}

export const productService = new ProductService()
