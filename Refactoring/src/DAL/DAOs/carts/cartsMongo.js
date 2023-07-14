import { cartsModel } from '../../mongoDB/models/carts.model.js'

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
            return await cartsModel.find(args)
        } catch(error) {
            throw error
        }
    }

       async getCartById(cartId) {
        try {
            return await cartsModel.findById(cartId)
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
}

export default CartManager