import { Router } from "express";
import CartManager from "../DAL/DAOs/carts/cartsMongo.js";
import ProductsManager from "../DAL/DAOs/products/productsMongo.js";

const router = Router()
const cartManager = new CartManager()

router.get('/:cid', async (req,res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(cid)
    res.json(cart)
})

router.post('/', async (req,res) => {
    const cart = await cartManager.createOne()
    res.json(cart)
})

router.post('/:cid/product/:pid', async (req,res) => {
    const productManager = new ProductsManager()
    const { cid, pid} = req.params

    let cart
    await productManager.getOneById(pid)
    const existsProductInCart = await cartManager.getCart({_id: cid})

    if(existsProductInCart.length) {
        cart = await cartManager.addProductToCart({_id:cid, "products.product":pid},
        {$inc:{"products.$.quantity":1}})
    } else {
        cart = await cartManager.addProductToCart({_id:cid},
        {$push:{
            "products":{product: pid, quantity:1}}})
    }
    res.json(cart)
})

export default router