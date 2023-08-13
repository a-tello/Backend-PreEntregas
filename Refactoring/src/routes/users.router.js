import { Router } from "express";
import { jwtValidation } from "../middlewares/auth.middleware.js";
import { userController } from "../controllers/users.controller.js";

const router = Router()

router.put('/premium/:uid', jwtValidation, userController.updateRole)

router.post('/:uid/documents', jwtValidation, userController.addDocuments)


export default router