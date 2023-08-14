import { productService } from "../services/products.services.js"

class ProductController {

    async  getProducts (req, res) {
        const {limit=10, page=1, sort={}, ...query} = req.query
    
        try {
            const products = await productService.getAll(query, {limit, page, sort})
            res.status(200).json(products)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async  getProductById (req, res) {
        const { pid } = req.params
        try {
            const product = await productService.getOneById(pid)
            res.status(200).json(product)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async  createProduct (req, res) {
        const productData = req.body
        const owner = req.user
        try {
            const newProduct = await productService.createOne(productData, owner)
            res.status(201).json(newProduct)
        } catch (err) {
            res.status(400).json(err.message)
        }
    }
    
    async  updateProduct (req, res) {
        const { pid } = req.params
        const updatedProductData = req.body
    
        try {
            const updatedProduct = await productService.updateOne(pid, updatedProductData)
            res.status(200).json(updatedProduct)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async  deleteProduct (req, res) {
        const { pid } = req.params
        const user = req.user
        
        try {
            const deletedProduct = await productService.deleteOne(pid, user)
            res.status(200).json(deletedProduct)
        } catch (err) {
            res.status(400).json(err.message)
        }
    }
}


export const productController = new ProductController()
