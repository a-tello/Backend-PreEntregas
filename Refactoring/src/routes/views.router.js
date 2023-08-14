import { Router } from "express"
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js"
import { viewsController } from "../controllers/views.controller.js"

const router = Router()


router.use(jwtValidation)

router.get('/login', viewsController.login)

router.get('/signup',  viewsController.signup)

router.get('/reset', viewsController.reset)

router.get('/resetPassword', viewsController.resetConfirmation)


router.get('/products', viewsController.products)

router.get('/carts/:cid', viewsController.cart)

router.get('/profile', viewsController.profile)

/* router.get('/error', async (req, res) => {
    if(!(req.user?.isLogged)) return res.redirect('/')

    return res.render("error")
}) */

router.get('/users', roleAuthorization('Admin'), viewsController.usersPanel)


export default router