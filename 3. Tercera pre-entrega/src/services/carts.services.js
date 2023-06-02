import CartManager from "../DAL/cartManagerMongo.js"
import ProductManager from "../DAL/productManagerMongo.js"

const cartManager =  new CartManager()

export const addCart = async () => {
    try {
        const newCart = await cartManager.addCart({"products": []})
        return newCart
    } catch(err) {
        err.code = 400
        throw err
    }

}

export const getAllCarts = async () => {
    
    try {
        const carts = await cartManager.getCarts()
        return carts
    } catch {
        const error = new Error('Carts not found')
        error.code = 404 
        throw error
    }
}

export const getCartById = async (cartId) => {
    
    try {
        const cart = await cartManager.getCartById(cartId)
        
        if(cart) {
            return cart
        }
        throw new Error
    } catch(err) {
        err.message = `Cart with id ${cartId} not found`
        err.code = 404
        throw err
    }
}


export const addProductToCart = async (cartId, productId) => {

    const productManager = new ProductManager()
    
    try{
        await productManager.getProductById(productId)
        await cartManager.getCartById(cartId)
        const existsProductInCart = await cartManager.getCart({_id: cartId, "products.product": productId})

        if(existsProductInCart) {
            const cart = await cartManager.addProductToCart({_id:cartId, "products.product":productId},
            {$inc:{"products.$.quantity":1}})
        } else {
            const cart = await cartManager.addProductToCart({_id:cartId},
            {$push:{
                "products":{product: productId, quantity:1}}})
        }
        return cart
    } catch(err) {
        throw err
    }

    
}

export const addProductsToCart = async (cartId, products) => {
    try{
        const cart = await cartManager.addProductsToCart({_id:cartId}, {$push:{"products":{$each :products}}})
        return cart
    } catch(err) {
        throw err
    }

}

export const updateProductQuantityFromCart = async(cartId, productId, newQuantity) => {

    const productManager = new ProductManager()
    try{
        await productManager.getProductById(productId)
        await cartManager.getCartById(cartId) 
        const cart = await cartManager.updateProductQuantityFromCart({_id:cartId, "products.product":productId}, {$set:{"products.$.quantity":newQuantity}})
        return cart
    } catch(err) {
        throw err
    }  
}

export const deleteProductFromCart = async (cartId, productId) => {

    try {
        await this.getCartById(cartId) 
        const cart = await cartManager.deleteProductFromCart({_id:cartId}, {"$pull":{"products":{"product":productId}}})
        return cart
    } catch (err) {
        throw err
    }
}

export const clearCart = async (cartId) => {
    
    try {
        await this.getCartById(cartId) 
        await cartsModel.updateOne({_id:cartId}, {"$pull":{"products":{}}})
    } catch (err) {
        throw err
    }
}