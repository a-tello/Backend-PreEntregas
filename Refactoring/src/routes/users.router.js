import { Router } from "express";
import { jwtValidation, roleAuthorization } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/users.controller.js";
import userRes from "../DAL/DTOs/userRes.dto.js";

const router = Router()

router.put('/premium/:uid', jwtValidation, userController.updateRole)

router.post('/:uid/documents', jwtValidation, roleAuthorization('User'), userController.addDocuments)

router.get('/', jwtValidation, roleAuthorization('Admin'),userController.getUsers)

router.delete('/', jwtValidation, roleAuthorization('Admin'), userController.removeInactiveUsers)

router.delete('/:uid', jwtValidation, roleAuthorization('Admin'), userController.removeUser)

export default router