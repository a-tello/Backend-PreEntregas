import { createUser, login } from "../services/users.services.js"

export const loginUser = async (req, res, next) => {
    const token = await login(req.body)
    if(token){
        res.cookie('Authorization', token.toString())
        // log para copiar al header
        console.log(token);
        return res.redirect('/views/products')
    }
    res.cookie('error', 'Usuario o contraseña incorrectos')
    res.redirect('/views/error')
     
}

export const singUpUser = async (req, res, next) => {
    const newUser = await createUser(req.body)
    if(!newUser) {
        res.cookie('error', 'El mail ya se encuentra registrado')
        return res.redirect('/views/error')
    }
    res.redirect('/views/login')
}

export const logoutUser = (req, res) => {
    res.clearCookie('Authorization')
    res.redirect('/views/login')
}