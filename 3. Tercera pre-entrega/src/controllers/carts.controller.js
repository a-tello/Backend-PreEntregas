import { addCart, addProductToCart, checkProducts, getCartById, addProductsToCart, updateProductQuantityFromCart, deleteProductFromCart, clearCart } from "../services/carts.services.js"
import { createTicket } from "../services/ticket.services.js"

export const getOneCart = async (req, res) => {
    const {cid} = req.params
        
    try {
        const cart = await getCartById(cid) 
        res.status(201).json({cart})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
}

export const addEmptyCart = async (req, res) => {

    try{
        const newCart = await addCart()
        res.status(201).json({'message': 'Cart created successfully', cart: newCart})
    } catch(err) {
        res.status(400).json({error: err.message})
    }

}

export const addOneProductToCart = async (req, res) => {
    const {cid, pid} = req.params
    
    try {
        const cart = await addProductToCart(cid, pid) 
        res.status(201).json({'message': 'Product added successfully', cart})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 

}

export const addProducts = async (req, res) => {
    const {cid} = req.params
    const products = req.body
    
    try {
        const cart = await addProductsToCart(cid, products)
        res.status(201).json({'message': 'Products added successfully', cart})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 
}

export const updateProductsFromCart = async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        if (quantity < 1) {
            const error = new Error
            error.message = 'Quantity must be greater than 0'
            throw error
        }
        
        await updateProductQuantityFromCart(cid, pid, quantity)
        res.status(201).json({'message': `Quantity of product ${pid} changed to ${quantity}`})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 
}

export const deleteProduct = async (req, res) => {
    const {cid, pid} = req.params
    
    try {
        await deleteProductFromCart(cid, pid)
        res.status(201).json({'message': `Product ${pid} deleted successfully from cart ${cid}`})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 

}

export const emptyCart = async (req, res) => {
    const {cid} = req.params
    
    try {
        await clearCart(cid)
        res.status(201).json({'message': `Products deleted successfully. Cart ${cid} is empty`})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 

}

export const purchase =  async (req,res) => {
    const cart = req.user.cart
    const availableProducts = await checkProducts(cart)
    const ticket = await createTicket(req.user, availableProducts )
    return res.render('ticket', {data: {ticket: ticket._doc, cart:availableProducts}})
}