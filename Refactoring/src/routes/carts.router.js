import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/:cid', cartController.getCart)

router.post('/', cartController.createCart)

router.post('/:cid/product/:pid', jwtValidation, roleAuthorization('User'), cartController.addOneProductToCart)

router.put('/:cid', jwtValidation, roleAuthorization('User'), cartController.addMultipleProductsToCart)

router.put('/:cid/products/:pid', cartController.changeQuantity)

router.delete('/:cid/products/:pid', cartController.deleteOneProductFromCart)

router.delete('/:cid', cartController.emptyCart)

router.get('/:cid/purchase', cartController.purchase)

export default router