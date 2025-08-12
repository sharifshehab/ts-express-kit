import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { userController } from "./user.controller";

export const userRoutes = Router();

userRoutes.post('/register', validateRequest(createUserZodSchema), userController.createUser);  // create user
userRoutes.get('/all-users', userController.getAllUsers);  // get all users
userRoutes.get('/:userId', userController.singleUser);    // get single user
userRoutes.put('/:id', validateRequest(updateUserZodSchema), userController.updateUser);  // update user
userRoutes.delete('/:userId', userController.deleteUser);   // delete user