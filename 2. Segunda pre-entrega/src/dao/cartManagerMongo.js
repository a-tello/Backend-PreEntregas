import ProductManager from './productManagerMongo.js'
import { cartsModel } from '../db/models/carts.model.js'



class CartManager {

    async addCart () {
        try {
            const newCart = await cartsModel.create({"products": []})
            return newCart
        } catch(err) {
            err.code = 400
            throw err
        }

    }

    async getCarts() {
        
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            return carts
        } catch {
            const error = new Error('Carts not found')
            error.code = 404 
            throw error
        }
    }

    async getCartById(cartId) {
        
        try {
            const cart = await cartsModel.findById(cartId)
            
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


    async addProductToCart(cartId, productId) {

        const productManager = new ProductManager()
        try{
            await productManager.getProductById(productId)
        } catch(err) {
            throw err
        }

        try {
            await this.getCartById(cartId) 
        } catch (err) {
            throw err
        }

        const existsProductInCart = await cartsModel.findOne({_id: cartId, "products.product": productId})

        if(existsProductInCart) {
            await cartsModel.updateOne({_id:cartId, "products.product":productId},
            {$inc:{"products.$.quantity":1}})
        } else {
            await cartsModel.findOneAndUpdate({_id:cartId},
            {$push:{
                "products":{product: productId, quantity:1}}})
        }


        
    }

}

export default CartManager