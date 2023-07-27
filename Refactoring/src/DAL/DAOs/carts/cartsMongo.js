import { cartsModel } from '../../mongoDB/models/carts.model.js'
import { productsModel } from '../../mongoDB/models/products.model.js'

class CartManager {
    
    async createOne (obj) {
        try {
            return await cartsModel.create({obj}) 
        } catch(err) {
            throw err
        }
    }

    async getCart(filter={}) {
        try {
            return await cartsModel.find(filter).populate('products.product').lean()
        } catch(error) {
            throw error
        }
    }

       async getCartById(cartId) {
        try {
            return await cartsModel.findById(cartId).populate('products.product').lean()
        } catch(err) {
            throw err
        }
    }

    async modifyProductFromCart(filter, action, opts) {
        try{
            return cartsModel.findOneAndUpdate(filter, action, opts)
        } catch(err) {
            throw err
        }  
    }

    async deleteOne(cartId){
        try {
            await cartsModel.findByIdAndDelete(cartId)
        } catch (err) {
            throw err
        }
    }
}

export const cartManager = new CartManager()