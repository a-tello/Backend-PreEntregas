import CartManager from "../DAL/DAOs/carts/cartsMongo.js"

const cartManager = new CartManager()

export const createOne = async  (obj) => {
    try {
        return await cartManager.createOne({obj}) 
    } catch(err) {
        throw err
    }

}

export const getCart = async (args={}) => {
    try {
        return await cartManager.getCart(args).populate('products.product').lean()
    } catch {
        const error = new Error('Carts not found')
        throw error
    }
}


export const getCartById = async (cartId) => {
    try {
        const cart = await cartManager.getCartById(cartId).populate('products.product').lean()
        return cart
    } catch(err) {
        throw err
    }
}

export const addProductToCart = async (cartID, productID) => {        
    
    try{
        const existsProductInCart = await cartManager.getCart({_id: cartID, "products.product": productID})

        if(existsProductInCart.length) {
            return await cartManager.modifyProductFromCart({_id:cid, "products.product":pid},
            {$inc:{"products.$.quantity":1}}, {new:true})

        } else {
            return await cartManager.modifyProductFromCart({_id:cid},
            {$push:{
                "products":{product: pid, quantity:1}}}, {new:true})
        }
    } catch(err) {
        throw err
    }   
}

export const addProductsToCart = async (cartId, products) => {
    try{
        return await cartManager.modifyProductFromCart({_id:cartId}, {$push:{"products":{$each :products}}}, {new:true})
    } catch(err) {
        throw err
    }
}

export const updateProductQuantityFromCart = async (cartId, productId, newQuantity) => {

    try{
        return await cartManager.modifyProductFromCart({_id:cartId, "products.product": productId}, {$set:{"products.$.quantity":newQuantity}}, {new:true})
    } catch(err) {
        throw err
    }  
}

export const deleteProductFromCart = async (cartId, productId) => {

    try {
        return await cartManager.modifyProductFromCart({_id:cartId}, {"$pull":{"products":{"product":productId}}}, {new:true})
    } catch (err) {
        throw err
    }
}

export const clearCart = async (cartId) => {
    
    try {
        return await cartManager.modifyProductFromCart({_id:cartId}, {"$pull":{"products":{}}}, {new:true})
    } catch (err) {
        throw err
    }
}