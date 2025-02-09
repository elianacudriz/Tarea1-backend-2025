import { Router } from "express";
import { CreateProducts, GetAllProducts, UpdateProduct, DeleteProduct} from "./products-controllers.js";

const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.post("/", CreateProducts);

productsRouter.patch("/:id", UpdateProduct);

productsRouter.delete("/:id", DeleteProduct);


export default productsRouter;