import { cartsModel } from '../../mongoDB/models/carts.model.js'

class CartManager {
    async createOne (products) {
        try {
            return await cartsModel.create({products}) 
        } catch(err) {
            throw err
        }

    }

    async getCart(args={}) {
        try {
            return await cartsModel.find(args).populate('products.product').lean()
        } catch {
            const error = new Error('Carts not found')
            throw error
        }
    }

    /* async getCarts() {

        try {
            const carts = await cartsModel.find()
            return carts
        } catch {
            throw error
        }
    } */

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
            return cartsModel.findOneAndUpdate(query, action, {new: true})
        } catch(err) {
            throw err
        }   
    }

    async addProductsToCart(cartId, products) {
        try{
            const cart = await cartsModel.findOneAndUpdate({_id:cartId}, {$push:{"products":{$each :products}}}, {new:true})
            return cart
        } catch(err) {
            throw err
        }
    }

    async updateProductQuantityFromCart(cartId, productId, newQuantity) {

        try{
            const cart = await cartsModel.findOneAndUpdate({_id:cartId, "products.product": productId}, {$set:{"products.$.quantity":newQuantity}}, {new:true})
            //const cart = await cartsModel.updateOne({_id:cartId, "products.product": productId}, {quantity:newQuantity}, {new:true})
            return cart
        } catch(err) {
            throw err
        }  
    }

    async deleteProductFromCart(cartId, productId) {

        try {
            const cart = await cartsModel.findByIdAndUpdate({_id:cartId}, {"$pull":{"products":{"product":productId}}}, {new:true})
            console.log(cart);
            return cart
        } catch (err) {
            throw err
        }
    }

    async clearCart(cartId) {
        
        try {
            return await cartsModel.findOneAndUpdate({_id:cartId}, {"$pull":{"products":{}}}, {new:true})
        } catch (err) {
            throw err
        }
    }
}

export default CartManager