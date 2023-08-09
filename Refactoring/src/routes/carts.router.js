import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";

const router = Router()

router.get('/:cid', cartController.getCart)

router.post('/', cartController.createCart)

router.post('/:cid/product/:pid', cartController.addOneProductToCart)

router.put('/:cid', cartController.addMultipleProductsToCart)

router.put('/:cid/products/:pid', cartController.changeQuantity)

router.delete('/:cid/products/:pid', cartController.deleteOneProductFromCart)

router.delete('/:cid', cartController.emptyCart)

router.get('/:cid/purchase', cartController.purchase)

export default router