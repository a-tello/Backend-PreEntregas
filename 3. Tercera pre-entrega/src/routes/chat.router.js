import { Router } from 'express'
import { verifyTokenUser } from '../middleware/jwt.middleware.js'

const router = Router()

router.get('/', verifyTokenUser, (req, res) => {
    res.render('chat')
})


export default router