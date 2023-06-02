import { addOneProduct, deleteOneProduct, getAllProducts, getOneProductById, updatedOneProduct } from '../controllers/products.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/', getAllProducts)
router.get('/:pid', getOneProductById)
router.post('/', addOneProduct)
router.put('/:pid', updatedOneProduct)
router.delete('/:pid', deleteOneProduct)

export default router