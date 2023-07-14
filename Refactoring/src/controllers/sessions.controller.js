import { loginUser, signup } from "../services/sessions.services"


export const login = async (req, res) => {
    const { email, password } = req.body
   
    try {
        const token = await loginUser(email, password)

        res.cookie('token', token, {httpOnly: true})
        res.redirect('/views/products')

    } catch (error) {
        res.json({error: 'Usuario o contraseña incorrectos'})
    }
}

router.post('/signup', async (req, res) => {
    const user = req.body
    try {
        return await signup (user) 
            ? res.redirect('/views/login')
            : res.json({error:'Ya existe un usuario registrado con ese mail'})
           
    } catch (error) {
        throw error
    }
})

router.get('/current', async (req, res) => {
    try {
        const { authorization } = req.headers
        const validateUser = jwt.verify(authorization, config.secretKeyTkn)
        const user = await userManager.getOneById(validateUser.userID)
        res.send(user)
        
    } catch (error) {
        res.send('Unauthorized')
    }
})

export const logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/views/login')
}


