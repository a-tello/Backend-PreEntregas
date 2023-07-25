import { Router } from "express";
import { addMultipleProductsToCart, addOneProductToCart, changeQuantity, createCart, deleteOneProductFromCart, emptyCart, getCart, purchase } from "../controllers/carts.controller.js";
import { user } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/:cid', getCart)

router.post('/', createCart)

router.post('/:cid/product/:pid', user, addOneProductToCart)

router.put('/:cid', user, addMultipleProductsToCart)

router.put('/:cid/products/:pid', changeQuantity)

router.delete('/:cid/products/:pid', deleteOneProductFromCart)

router.delete('/:cid', emptyCart)

router.get('/:cid/purchase', purchase)

export default router