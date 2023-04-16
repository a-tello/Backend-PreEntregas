import { Router } from 'express'
import CartManager from '../dao/cartManagerMongo.js '
//import CartManager from '../dao/cartManagerFS.js'

const cartManager = new CartManager()
const router = Router()


router.post('/', async (req, res) => {

    try{
        const newCart = await cartManager.addCart()
        res.status(201).json({'message': 'Cart created successfully', cart: newCart})
    } catch(err) {
        res.status(400).json({error: err.message})
    }

    
})

router.get('/:cid', async (req, res) => {
    const {cid} = req.params
        
    try {
        const cart = await cartManager.getCartById(cid) 
        res.status(200).json(cart)
    } catch(error) {
        res.status(error.code).json({error: error.message})
    } 

})

router.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    
    try {
        const cart = await cartManager.addProductToCart(cid, pid) 
        res.status(201).json({'message': 'Product added successfully', cart})
    } catch(error) {
        res.status(400).json({error: error.message})
    } 

})

export default router