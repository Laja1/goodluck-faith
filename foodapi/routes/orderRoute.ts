import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";

import { createOrder,getAllOrders, getAllUserOrders, deleteOrder } from "../controller/order";

const orderRouter:Router = Router();

orderRouter.post("/", [authMiddleware], createOrder);
orderRouter.get("/", [authMiddleware, adminMiddleware], getAllOrders); // Updated route for admin
orderRouter.get("/user", [authMiddleware], getAllUserOrders); 
orderRouter.delete("/:id", [authMiddleware, adminMiddleware], deleteOrder);

export default orderRouter;