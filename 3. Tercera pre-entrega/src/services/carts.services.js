import CartManager from "../DAL/DAO/cartManagerMongo.js"
import ProductManager from "../DAL/DAO/productManagerMongo.js"

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
        let cart
        await productManager.getProductById(productId)
        await cartManager.getCartById(cartId)
        const existsProductInCart = await cartManager.getCart({_id: cartId, "products.product": productId})

        if(existsProductInCart.length) {
            cart = await cartManager.addProductToCart({_id:cartId, "products.product":productId},
            {$inc:{"products.$.quantity":1}})
        } else {
            cart = await cartManager.addProductToCart({_id:cartId},
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
        await getCartById(cartId)
        const cart = await cartManager.deleteProductFromCart(cartId,productId)
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

export const checkProducts = async (cartId) => {
    const cart = await getCartById(cartId)
    const availableProducts = await checkStock(cart.products)
    await updateProductsFromCart(cartId, availableProducts) 
    return availableProducts
}

export const checkStock = async (products) => {
    try {
        const productManager =  new ProductManager()
        const availableProducts = []  
        
        for (const cartProduct of products) {
            const { product, quantity } = cartProduct
            const productDB = await productManager.getProductById(product._id)

            if(productDB.stock > quantity) {
                const updatedStock = productDB.stock - quantity
                await productManager.updateProduct(productDB._id, {stock: updatedStock})
                availableProducts.push(cartProduct) 
            }
        }
        return availableProducts
    } catch (err) {
        throw err
    }
}

export const updateProductsFromCart = async (cartId, products) => {
    for (const product of products) {
        await deleteProductFromCart(cartId, product.product._id)
    }
}