import { Router } from "express";
import { getProduct, getProducts, deleteProduct, createProduct, updateProduct } from "../controller/product";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/admin";
const productRouter:Router = Router ();

productRouter.get('/',getProducts);
productRouter.get('/:id',getProduct);
productRouter.post('/', createProduct);
productRouter.put('/:id', [authMiddleware,adminMiddleware],updateProduct);
productRouter.delete('/:id', [authMiddleware,adminMiddleware],deleteProduct);

export default productRouter