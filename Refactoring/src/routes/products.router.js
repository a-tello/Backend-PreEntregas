import { Router } from "express";
import { productController } from "../controllers/products.controller.js";
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js";

const router = Router()

//router.use(jwtValidation)

router.get('/', productController.getProducts)

router.get('/:pid', productController.getProductById)

router.post('/' , jwtValidation, roleAuthorization('Admin'), productController.createProduct)

router.put('/:pid', roleAuthorization('Admin'), productController.updateProduct)

router.delete('/:pid', roleAuthorization('Admin'), productController.deleteProduct)

export default router