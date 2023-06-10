import { Router } from 'express'
import { addEmptyCart, addOneProductToCart, addProducts, deleteProduct, emptyCart, getOneCart, purchase, updateProductsFromCart } from '../controllers/carts.controller.js'
import { jwtValidator, verifyTokenUser } from '../middleware/jwt.middleware.js'

const router = Router()

router.get('/:cid', getOneCart)
router.get('/:cid/purchase', jwtValidator, purchase)
router.post('/', addEmptyCart)
router.post('/:cid/product/:pid', verifyTokenUser,addOneProductToCart)
router.put('/:cid', addProducts)
router.put('/:cid/products/:pid',updateProductsFromCart )
router.delete('/:cid/products/:pid', deleteProduct)
router.delete('/:cid', emptyCart)

export default router