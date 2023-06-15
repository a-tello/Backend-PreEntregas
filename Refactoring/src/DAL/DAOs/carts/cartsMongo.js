import { cartsModel } from '../../mongoDB/models/carts.model.js'

class CartManager {
    async createOne (products) {
        try {
            return await cartsModel.create({products}) 
        } catch(err) {
            throw err
        }

    }

    async getCart(args) {
        try {
            return await cartsModel.find(args).populate('products.product').lean()
        } catch {
            const error = new Error('Carts not found')
            throw error
        }
    }

    async getCarts() {

        try {
            const carts = await cartsModel.find()
            return carts
        } catch {
            throw error
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartsModel.findById(cartId).populate('products.product').lean()
            return cart
        } catch(err) {
            throw err
        }
    }


    async addProductToCart(query, action) {        
        try{
            const cart = cartsModel.findOneAndUpdate(query, action, {new: true})
            return cart
        } catch(err) {
            throw err
        }   
    }

    async addProductsToCart(cartId, products) {
        try{
            const cart = await cartsModel.findOneAndUpdate(cartId, products, {new: true})
            return cart
        } catch(err) {
            throw err
        }
    }

    async updateProductQuantityFromCart(cartId, product, newQuantity) {

        try{
            const cart = await cartsModel.updateOne(cartId, product, newQuantity, {new: true})
            return cart
        } catch(err) {
            throw err
        }  
    }

    async deleteProductFromCart(cartId, productId) {

        try {
            const cart = await cartsModel.updateOne(cartId, productId, {new: true})
            return cart
        } catch (err) {
            throw err
        }
    }

    async clearCart(cartId, field) {
        
        try {
            await cartsModel.updateOne(cartId, field)
        } catch (err) {
            throw err
        }
    }
}

export default CartManager