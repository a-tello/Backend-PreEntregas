import { userService } from "../services/users.services.js";

class UserController {

    async updateRole(req, res) {
        const { uid } = req.params
        const { role } = req.user
        try {
            const newToken = await userService.changeRole(uid, role)
            console.log(newToken);
            res.status(200).json({message:'Role cambiado con exito'})
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

    async getUsers(req, res){
        try {
            const users = await userService.getAllUsers()
            res.status(200).send(users)
        } catch (error) {
            res.status(400).send(error.message)
        }
        
    }

    async removeInactiveUsers(req, res) {
        try {
            const removedUsers = await userService.removeInactiveUsers()
            res.status(200).send(`Removed users: ${removedUsers.length}`)
        } catch (error) {
            res.send(error.message)
        }
    }

    async removeUser(req, res) {
        console.log('remove controller');
        const { uid } = req.params
        try {
            await userService.deleteUser(uid)
            res.status(200).json({message:`User removed successfully`})
        } catch (error) {
            res.send(error.message)
        }
    }
    
}

export const userController = new UserController()