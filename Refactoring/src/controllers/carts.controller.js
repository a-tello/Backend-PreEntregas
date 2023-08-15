import { cartService } from "../services/carts.services.js"
import { productService } from "../services/products.services.js"
import { ticketService } from "../services/ticket.services.js"


class CartController {

    async createCart (req,res) {
        try {
            const cart = await cartService.createOne()
            res.status(200).json(cart)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async getCart (req,res) {
        const { cid } = req.params
    
        try {
            const cart = await cartService.getCartById(cid)
            res.status(200).json({cart})
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async addOneProductToCart (req,res) {
        const { cid, pid } = req.params
        const user = req.user
        
        try {
            const cart = await cartService.addProductToCart(cid, pid, user)
            res.status(200).json({message: 'Product added successfully', cart})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async addMultipleProductsToCart (req,res) {
        const {cid} = req.params
        const user = req.user
        const products = req.body
        
        try {
            await cartService.addProductsToCart(cid, products, user)
            const cart = await cartService.getCartById(cid)
            res.status(200).json({message:'Products added successfully', cart})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async changeQuantity (req,res) {
        const { cid, pid } = req.params
        const { quantity } = req.body
        
        try {
            const cart = await cartService.updateProductQuantityFromCart(cid, pid, quantity )
            res.status(200).json({message:'Products added successfully', cart})
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async deleteOneProductFromCart (req, res) {
        const { cid, pid } = req.params
        
        try {
            const cart = await cartService.deleteProductFromCart(cid, pid)
            res.status(200).json({message:'Product deleted',cart})
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async emptyCart (req, res) {
        const {cid} = req.params   
    
        try {
        const cart = await cartService.clearCart(cid)
            res.status(200).json({message:'Empty cart',cart})
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async purchase (req, res) {
        const { email, cart } = req.user

        try {
            
            const availableProducts =  await productService.getAvailableProducts(cart)
            const ticket = await ticketService.createTicket(email, availableProducts)    
            res.render('ticket', {code: ticket.code.toString(), amount: ticket.amount.toString(), purchase_datetime: ticket.purchase_datetime.toJSON()})
        } catch (error) {
            throw error
        }
    }

}

export const cartController = new CartController()
