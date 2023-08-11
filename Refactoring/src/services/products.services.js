import { cartManager } from "../DAL/DAOs/carts/cartsMongo.js"
import { productManager } from "../DAL/DAOs/products/productsMongo.js"
import { cartService } from "./carts.services.js"
import { userService } from "./users.services.js"

class ProductService {
    async getAll (query, params) {
        try {
            const products = await productManager.getAll(query, params)
            return {
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: `localhost:8080/products/`,
                nextLink: `localhost:8080/products/`
            }
        } catch (err) {
            return {
                status: 'error',
                msg: err
            }
        }
    }
    
    async getOneById (id) {
        try {
            return await productManager.getOneById(id)
        } catch (err) {
            throw err
        }
    }
    
    async createOne (product, owner) {
        try {
             
            if(!product.owner || owner.role === 'Admin') {
                const newProduct = {...product, owner: 'Admin'}
                return await productManager.createOne(newProduct)
            
            } else {
                const user = await userService.getOneUserBy({email: product.owner})
                if(user[0].role !== owner.role) throw new Error('Owner must be a premium user')
                return await productManager.createOne(product)
            }
        } catch (err) {
            throw err
        }
    }
    
    async updateOne (id, data) {
        try {
            return await productManager.updateOne(id, data, {new:true})
        } catch (err) {
            throw err
        }
    }
    
    async deleteOne (id, user) {

        try {
            if(user.role === 'Premium'){ 
                const product = await productManager.getOneById(id)
                if(product.owner !== user.email) throw new Error('Premium users can only remove their own products')
            }
            return await productManager.deleteOne(id)
        } catch (err) {
            throw err
        }
    }

    async isAvailable (id, quantity) {
        const product = await productManager.getOneById(id)
        return product.stock >= quantity
    }

    async getAvailableProducts (cartID) {
        const getCart = await cartService.getCartById({_id:cartID})
        const availableProducts = getCart.products.filter(product => product.product.stock >= product.quantity )
        
        for(let product of availableProducts) {
            await cartService.deleteProductFromCart(cartID, product.product._id)
            const newStock = product.product.stock - product.quantity
            await productManager.updateOne(product.product._id, {stock: newStock})
        }

        return availableProducts
    }
}

export const productService = new ProductService()
