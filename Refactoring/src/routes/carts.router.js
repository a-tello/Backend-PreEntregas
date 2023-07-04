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
    const existsProductInCart = await cartManager.getCart({_id: cid, "products.product": pid})
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

router.put('/:cid', async(req, res) => {
    const { cid } = req.params
    const products = req.body
    const cart = await cartManager.addProductsToCart(cid, products)
    res.json({message:'Products added successfully', cart})

})

router.put('/:cid/products/:pid', async(req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const cart = await cartManager.updateProductQuantityFromCart(cid, pid, quantity )
    res.json({message:'Products added successfully', cart})

})

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartManager.deleteProductFromCart(cid, pid)
    res.json({message:'Product deleted',cart})
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.clearCart(cid)
    res.json({message:'Empty cart',cart})
})

export default router