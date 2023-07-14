import { createOne, deleteOne, getAll, getOneById, updateOne } from "../services/products.services.js"

export const getProducts = async (req, res) => {
    const {limit=10, page=1, sort={}, ...query} = req.query

    try {
        const products = await getAll(query, {limit, page, sort})
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const getProductById = async (req, res) => {
    const id = req.params

    try {
        const product = await getOneById(id)
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const createProduct = async (req, res) => {
    const productData = req.body
    try {
        const newProduct = await createOne(productData)
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params
    const updatedProductData = req.body

    try {
        const updatedProduct = await updateOne(id, updatedProductData)
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params
    
    try {
        const deleteProduct = await deleteOne(id)
        res.status(200).json(deleteProduct)
    } catch (err) {
        res.status(400).json(err)
    }
}