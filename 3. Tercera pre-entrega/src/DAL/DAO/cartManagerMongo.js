import ProductManager from './productManagerMongo.js'
import { cartsModel } from '../mongoDB/models/carts.model.js'

class CartManager {

    async addCart (products) {
        try {
            const newCart = await cartsModel.create({products})
            return newCart
        } catch(err) {
            err.code = 400
            throw err
        }

    }

    async getCart(args) {
        
        try {
            const carts = await cartsModel.find(args)
            return carts
        } catch {
            const error = new Error('Carts not found')
            error.code = 404 
            throw error
        }
    }

    async getCarts() {
        
        try {
            const carts = await cartsModel.find()
            return carts
        } catch {
            const error = new Error('Carts not found')
            error.code = 404 
            throw error
        }
    }

    async getCartById(cartId) {
        
        try {
            const cart = await cartsModel.findById(cartId).populate('products.product').lean()
            return cart
        } catch(err) {
            err.message = `Cart with id ${cartId} not found`
            err.code = 404
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
            const cart = await cartsModel.updateOne({_id:cartId}, {"$pull":{"products":{"product":productId}}}, {new:true})
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