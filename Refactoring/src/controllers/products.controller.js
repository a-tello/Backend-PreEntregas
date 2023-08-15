import { productService } from "../services/products.services.js"

class ProductController {

    async  getProducts (req, res) {
        const {limit=10, page=1, sort={}, ...query} = req.query
    
        try {
            const products = await productService.getAll(query, {limit, page, sort})
            res.status(200).json(products)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async  getProductById (req, res) {
        const { pid } = req.params
        try {
            const product = await productService.getOneById(pid)
            res.status(200).json(product)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async  createProduct (req, res) {
        const productData = req.body
        const owner = req.user
        try {
            const newProduct = await productService.createOne(productData, owner)
            res.status(201).json({message: 'Product created successfully', product: newProduct})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async  updateProduct (req, res) {
        const { pid } = req.params
        const updatedProductData = req.body
    
        try {
            const updatedProduct = await productService.updateOne(pid, updatedProductData)
            res.status(200).json({message: 'Product modified successfully', product: updatedProduct})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
    async  deleteProduct (req, res) {
        const { pid } = req.params
        const user = req.user
        
        try {
            await productService.deleteOne(pid, user)
            res.status(200).json({message: `Product ${pid} removed successfully`})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}


export const productController = new ProductController()
