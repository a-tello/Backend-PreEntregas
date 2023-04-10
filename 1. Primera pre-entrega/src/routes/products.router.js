import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router()
const productManager = new ProductManager('products.json')


router.get('/', async (req, res) => {
    const {limit} = req.query
    
    try {
        const products = await productManager.getProducts()
    
        if(!limit) return res.status(200).json(products)
        res.status(200).json(products.slice(0, limit))

    } catch(error) {
        res.status(error.code).json({error: error.message})
    }
})

router.get('/:pid', async (req, res) => {
    const {pid} = req.params
        
    try {
        const product = await productManager.getProductById(+pid) 
        res.status(200).json(product)
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
})

router.post('/', async (req, res) => {
    const product = req.body
        
    try {
        await productManager.addProduct(product)
        res.status(201).json({'message': 'Product created', 'product': product})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
})

router.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const newValues = req.body
    
        
    try {
        const updatedProduct = await productManager.updateProduct(+pid, newValues)
        res.status(201).json({'message': 'Product updated', 'product': updatedProduct})
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
})

router.delete('/:pid', async (req, res) => {
    const {pid} = req.params
        
    try {
        await productManager.deleteProductById(+pid)
        res.status(200).json('Product deleted successfully')
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 
})


export default router