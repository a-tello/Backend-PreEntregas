import { Router } from "express";
import ProductsManager from "../DAL/DAOs/products/productsMongo.js";

const router = Router()
const productsManager = new ProductsManager()

router.get('/', async (req,res) => {
    const {limit=undefined, ...query} = req.query
    //const products = await productsManager.getAll({limit, page, sort: {price: sort}, lean:true, leanWithId: false})
    const products = await productsManager.getAll(query, limit)
    res.json(products)
} )

router.get('/:pid', async (req,res) => {
    const { pid } = req.params
    const product = await productsManager.getOneById(pid)
    res.json(product)
} )

router.post('/', async (req,res) => {
    const productData = req.body
    const newProduct = await productsManager.createOne(productData)
    res.json(newProduct)
})

router.put('/:pid', async (req,res) => {
    const { pid } = req.params
    console.log({pid});
    const updatedProductData = req.body
    const updatedProduct = await productsManager.updateOne(pid, updatedProductData)
    res.json(updatedProduct)
})

router.delete('/:pid', async (req,res) => {
    const { pid } = req.params
    const deleteProduct = await productsManager.deleteOne(pid)
    res.json(deleteProduct)
})

export default router