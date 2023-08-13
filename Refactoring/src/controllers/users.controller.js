import { userService } from "../services/users.services.js";

class UserController {

    async updateRole(req, res) {
        const { email, role } = req.user
        try {
            const newToken = userService.changeRole(email, role)
            console.log(newToken);
            res.status(200).send('Role cambiado con exito')
    } catch (error) {
            res.send(error.message)
        }
    }

    async addDocuments (req, res) {
        const files = req.files
        const { uid } = req.params
        
        try {
            await userService.addDocumentsToUser(uid, files)
            res.status(200).send('Agregados')
        } catch (err) {
            res.send(err.message)
        }
    }
    
}

export const userController = new UserController()