import { Router } from "express";
import { updatedUser, getAllUsers } from "../controller/user";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

const userRouter:Router = Router ();

userRouter.get('/', [authMiddleware,adminMiddleware],getAllUsers);
userRouter.put('/', [authMiddleware],updatedUser);

export default userRouter;

