import { Router } from "express";
import { jwtValidation } from "../middlewares/auth.middleware.js";
import { userService } from "../services/users.services.js";
import { generateToken } from "../jwt.utils.js";

const router = Router()
const EXPIRATION_TIME_TOKEN = 600

router.put('/premium/:uid', jwtValidation, async (req, res) => {
    try {
        
        const { email, role } = req.user
        const newRole = role === 'User'
        ? 'Premium'
        : 'User'
        await userService.updateUser({email}, {role: newRole})
        const user = await userService.getOneUserBy({email})
        const token = generateToken({user: {userID: user[0]._id, role: user[0].role}}, EXPIRATION_TIME_TOKEN)
        console.log(token);
        res.send('Role cambiado con exito')
    } catch (error) {
        res.send(error.message)
    }
    
} )


export default router