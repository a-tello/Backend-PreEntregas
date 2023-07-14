import { addProductToCart, addProductsToCart, clearCart, createOne, deleteProductFromCart, getCartById, updateProductQuantityFromCart } from "../services/carts.services.js"
import { getOneById } from "../services/products.services.js"

export const createCart = async (req,res) => {
    try {
        const cart = await createOne()
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const getCart = async (req,res) => {
    const id = req.params
    
    try {
        const cart = await getCartById(id)
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const addOneProductToCart = async (req,res) => {
    const { cid, pid } = req.params
    
    try {
        await getOneById(pid)
        const cart = await addProductToCart(cid, pid)
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const addMultipleProductsToCart = async (req,res) => {
    const cid = req.params
    const products = req.body
    
    try {
        const cart = await addProductsToCart(cid, products)
        res.status(200).json({message:'Products added successfully', cart})
    } catch (err) {
        res.status(400).json(err)
    }
}

export const changeQuantity = async (req,res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    
    try {
        const cart = await updateProductQuantityFromCart(cid, pid, quantity )
        res.status(200).json({message:'Products added successfully', cart})
    } catch (err) {
        res.status(400).json(err)
    }
}

export const deleteOneProductFromCart = async (req, res) => {
    const { cid, pid } = req.params
    
    try {
        const cart = await deleteProductFromCart(cid, pid)
        res.status(200).json({message:'Product deleted',cart})
    } catch (err) {
        res.status(400).json(err)
    }
}

export const emptyCart = async (req, res) => {
    const cid = req.params   

    try {
    const cart = await clearCart(cid)
        res.status(200).json({message:'Empty cart',cart})
    } catch (err) {
        res.status(400).json(err)
    }
}

