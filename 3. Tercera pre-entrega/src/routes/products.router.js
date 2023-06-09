import { addOneProduct, deleteOneProduct, getAllProducts, getOneProductById, updatedOneProduct } from '../controllers/products.controller.js'
import { Router } from 'express'
import { verifyTokenAdmin } from '../middleware/jwt.middleware.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/:pid', getOneProductById)
router.post('/', verifyTokenAdmin, addOneProduct)
router.put('/:pid', updatedOneProduct)
router.delete('/:pid', deleteOneProduct)

export default router