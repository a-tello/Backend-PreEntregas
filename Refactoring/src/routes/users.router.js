import { Router } from "express";
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/users.controller.js";
import { userUpload } from "../middlewares/multer.middleware.js";

const router = Router()

router.put('/premium/:uid', jwtValidation, roleAuthorization('User', 'Admin'), userController.updateRole)

router.post('/:uid/documents', jwtValidation, roleAuthorization('User'), userUpload, userController.addDocuments)

router.get('/', jwtValidation, roleAuthorization('Admin'),userController.getUsers)

router.delete('/', jwtValidation, roleAuthorization('Admin'), userController.removeInactiveUsers)

router.delete('/:uid', jwtValidation, roleAuthorization('Admin'), userController.removeUser)

export default router