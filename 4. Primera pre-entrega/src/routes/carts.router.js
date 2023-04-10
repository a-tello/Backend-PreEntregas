import { Router } from 'express'
import CartManager from '../CartManager.js'

const cartManager = new CartManager('carts.json')

const router = Router()

router.post('/', async (req, res) => {

    await cartManager.addCart(
    res.status(201).json({'message': 'Cart created successfully'})

    )
})

router.get('/:cid', async (req, res) => {
    const {cid} = req.params
        
    try {
        const cart = await cartManager.getCartById(+cid) 
        res.status(200).json(cart.products)
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 

})

router.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    
    try {
        await cartManager.addProductToCart(+cid, +pid) 
        res.status(201).json({'message': 'Product successfully added to cart '})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 

})

export default router