import { cartService } from "../services/carts.services.js";
import { productService } from "../services/products.services.js"
import jwt from 'jsonwebtoken'


class ViewsController {
    
    async products (req, res) { 

        if(!(req.user?.isLogged)) return res.redirect('/')
    
        const products = await productService.getAll({},{lean:true, leanWithId:false})
        const user = req.user
        console.log({user});    
        const token = req.cookies.Authorization
        return res.render("products", {user, data: {products: products.payload, cart:   user.cart?.toString(), token}})
    }

    async cart (req, res) {
        if(!(req.user?.isLogged)) return res.redirect('/')
    
        const {cid} =req.params
        const cart = await cartService.getCart({_id:cid})
        return res.render("carts", {cart:cart[0]})
    }

    async login(req, res){
        if(req.user?.isLogged) return res.redirect('/views/products')
       
        return res.render("login")
    }

    async signup(req, res) {
        if(req.user?.isLogged) return res.redirect('/views/products')
    
        return res.render("signup")
    }

    async reset (req, res) {
        if(req.user?.isLogged) return res.redirect('/views/products')
    
        res.render('reset')
    }

    async resetConfirmation (req, res) {
        const { token } = req.query
    
        if(req.user?.isLogged || !token) return res.redirect('/views/products')
    
        try {
            if(jwt.verify(token, config.secretKeyTkn)) {
                res.cookie('Authorization', token.toString())
                return res.render('newPassword')
            }
        } catch (error) {
            console.log(error.message);
            res.send('El enlace ha expirado. Genere un nuevo enlace')
        }
    }

    async profile (req, res) {
        if(!(req.user?.isLogged)) return res.redirect('/')
    
        const user = req.user
        return res.render("profile", {user})
    }

    async usersPanel (req, res) { 
        if(!(req.user?.isLogged)) return res.redirect('/')
    
    
        const users = await userService.getAllUsers()
        const token = req.cookies.Authorization
    
        return res.render("usersPanel", {users, token})
    }
}

export const viewsController = new ViewsController()