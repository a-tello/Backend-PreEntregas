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
        console.log(pid);
        try {
            const product = await productService.getOneById(pid)
            res.status(200).json(product)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    
    async  createProduct (req, res) {
        const productData = req.body
        try {
            const newProduct = await productService.createOne(productData)
            res.status(201).json(newProduct)
        } catch (err) {
            res.status(400).json(err)
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
        
        try {
            const deleteProduct = await productService.deleteOne(pid)
            console.log({delete:deleteProduct});
            res.status(200).json(deleteProduct)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}


export const productController = new ProductController()
