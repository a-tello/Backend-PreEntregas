import { Router } from "express";
import { productController } from "../controllers/products.controller.js";

const router = Router()

router.get('/', productController.getProducts)

router.get('/:pid', productController.getProductById)

router.post('/' , productController.createProduct)

router.put('/:pid', productController.updateProduct)

router.delete('/:pid', productController.deleteProduct)

export default router