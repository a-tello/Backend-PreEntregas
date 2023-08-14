import { cartManager } from "../DAL/DAOs/carts/cartsMongo.js"
import { productService } from "./products.services.js"

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
    
    async addProductToCart (cartID, productID, user={user: {role:''}}, quantity = 1) {        
        try{
            const product = await productService.getOneById(productID)

            if(product.stock < quantity) throw new Error('Stock not available')

            if(user.role === 'Premium' && product.owner === user.email) throw new Error('Premium users cannot add their own products to cart')

            if(await this.isProductInCart(cartID, productID)) {
                return await cartManager.updateCart({_id:cartID, "products.product":productID},
                {$inc:{"products.$.quantity":quantity}})
    
            } else {
                return await cartManager.updateCart({_id:cartID},
                {$push:{
                    "products":{product: productID, quantity:quantity}}}, {new:true})
            }
        } catch(err) {
            throw err
        }   
    }
    
    async addProductsToCart (cartId, products) {
        try{
            products.forEach(async product => {
                await this.addProductToCart(cartId, product.product, product.quantity )
            })
            return
        } catch(err) {
            throw err
        }
    }
    
    async updateProductQuantityFromCart (cartId, productId, newQuantity) {
    
        try{
            return await cartManager.updateCart({_id:cartId, "products.product": productId}, {$set:{"products.$.quantity":newQuantity}}, {new:true})
        } catch(err) {
            throw err
        }  
    }
    
    async deleteProductFromCart (cartId, productId) {
    
        try {
            return await cartManager.updateCart({_id:cartId}, {"$pull":{"products":{"product":productId}}}, {new:true})
        } catch (err) {
            throw err
        }
    }
    
    async clearCart (cartId) {
        
        try {
            return await cartManager.updateCart({_id:cartId}, {"$pull":{"products":{}}}, {new:true})
        } catch (err) {
            throw err
        }
    }

    async isProductInCart(cartID, productID) {
        const cart =  await cartManager.getCart({_id: cartID, "products.product": productID})
        return cart.length
    }

}

export const cartService = new CartService()