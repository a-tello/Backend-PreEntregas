import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import { admin } from "../middlewares/auth.middleware.js";
import { jwtValidatorCookie, jwtValidatorHeader } from "../middlewares/jwt.middleware.js"


const router = Router()

router.get('/', getProducts)

router.get('/:pid', getProductById)

router.post('/', admin , createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

export default router