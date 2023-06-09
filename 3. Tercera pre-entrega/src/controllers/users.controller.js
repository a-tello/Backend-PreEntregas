import { login } from "../services/users.services.js"

export const loginUser = async (req, res) => {
    const token = await login(req.body)
    return token
    ? res.cookie('token', token, { httpOnly: true, secure:false} ).redirect('/views/products') 
    : res.redirect('/views/error')          
}

export const logoutUser = (req, res) => {
    res.clearCookie('token')
    res.redirect('/views/login')
}