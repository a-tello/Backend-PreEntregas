import { Router } from "express";
import { addMultipleProductsToCart, addOneProductToCart, changeQuantity, createCart, deleteOneProductFromCart, emptyCart, getCart } from "../controllers/carts.controller.js";

const router = Router()

router.get('/:cid', getCart)

router.post('/', createCart)

router.post('/:cid/product/:pid', addOneProductToCart)

router.put('/:cid', addMultipleProductsToCart)

router.put('/:cid/products/:pid', changeQuantity)

router.delete('/:cid/products/:pid', deleteOneProductFromCart)

router.delete('/:cid', emptyCart)

export default router