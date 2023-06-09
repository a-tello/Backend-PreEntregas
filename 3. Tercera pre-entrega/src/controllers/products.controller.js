import { addProduct, deleteProductById, getProductById, getProducts, updateProduct } from '../services/products.services.js'

export const getAllProducts = async (req, res) => {
    const {limit=10, page=1, sort=null,...query} = req.query
    
    try {
        const products = await getProducts(limit, page, query, sort)
        res.status(200).json({message: 'productos', products})        
        
    } catch(error) {
        res.status(error.code).json({error: error.message})
    }
}

export const getOneProductById = async (req, res) => {
    const {pid} = req.params
        
    try {
        const product = getProductById(pid) 
        res.status(200).json({message: 'productos', product})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
}

export const addOneProduct = async (req, res) => {
    const product = req.body
    
    try {
        await addProduct(product)
        res.status(201).json({'message': 'Product created', 'product': product})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 
}

export const updatedOneProduct = async (req, res) => {
    const {pid} = req.params
    const newValues = req.body
    
        
    try {
        const updatedProduct = await updateProduct(pid, newValues)
        res.status(201).json({'message': 'Product updated', 'product': updatedProduct})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
}

export const deleteOneProduct = async (req, res) => {
    const {pid} = req.params
        
    try {
        const deleted = await deleteProductById(pid)
        if(!deleted) {
            res.status(404).json(`Product ${pid} not found`)
            return
        }
        res.status(200).json(`Product ${pid} deleted successfully`)
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
}