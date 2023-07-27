import { cartManager } from "../DAL/DAOs/carts/cartsMongo.js"

class CartService {

    async createOne (obj) {
        try {
            return await cartManager.createOne({obj}) 
        } catch(err) {
            throw err
        }
    
    }
    
    async getCart (args={}) {
        try {
            return await cartManager.getCart(args)
        } catch {
            const error = new Error('Carts not found')
            throw error
        }
    }
    
    
    async getCartById (cartId) {
        try {
            const cart = await cartManager.getCartById(cartId)
            return cart
        } catch(err) {
            throw err
        }
    }
    
    async addProductToCart (cartID, productID) {        
        
        try{
            const existsProductInCart = await cartManager.getCart({_id: cartID, "products.product": productID})
    
            if(existsProductInCart.length) {
                return await cartManager.modifyProductFromCart({_id:cartID, "products.product":productID},
                {$inc:{"products.$.quantity":1}}, {new:true})
    
            } else {
                return await cartManager.modifyProductFromCart({_id:cartID},
                {$push:{
                    "products":{product: productID, quantity:1}}}, {new:true})
            }
        } catch(err) {
            throw err
        }   
    }
    
    async addProductsToCart (cartId, products) {
        try{
            return await cartManager.modifyProductFromCart({_id:cartId}, {$push:{"products":{$each :products}}}, {new:true})
        } catch(err) {
            throw err
        }
    }
    
    async updateProductQuantityFromCart (cartId, productId, newQuantity) {
    
        try{
            return await cartManager.modifyProductFromCart({_id:cartId, "products.product": productId}, {$set:{"products.$.quantity":newQuantity}}, {new:true})
        } catch(err) {
            throw err
        }  
    }
    
    async deleteProductFromCart (cartId, productId) {
    
        try {
            return await cartManager.modifyProductFromCart({_id:cartId}, {"$pull":{"products":{"product":productId}}}, {new:true})
        } catch (err) {
            throw err
        }
    }
    
    async clearCart (cartId) {
        
        try {
            return await cartManager.modifyProductFromCart({_id:cartId}, {"$pull":{"products":{}}}, {new:true})
        } catch (err) {
            throw err
        }
    }
}

export const cartService = new CartService()