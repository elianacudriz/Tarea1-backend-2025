import { Router } from "express";
import { CreateProducts, GetAllProducts, UpdateProducts, DeleteProduct} from "./products-controllers.js";
import validate from "../../middlewares/validator.js";
import{body, param} from "express-validator";
import { authMiddleware } from "../../middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.post("/",
     [
        authMiddleware,
        body("name").exists().isString().isAlphanumeric(),
        body("description").exists().isString(),
        body("stock").exists().isNumeric(), 
        body("price").exists().isNumeric(), 
        body("active").exists().isBoolean(),
         validate], CreateProducts);

productsRouter.patch("/:id", 
    [
        authMiddleware,
        param("id").exists().isNumeric(),
        body("id").not().exists(),
        body("name").exists().isString().isAlphanumeric(),
        body("description").exists().isString(),
        body("stock").exists().isNumeric(), 
        body("price").exists().isNumeric(), 
        body("active").exists().isBoolean(),
        validate,
        
    ]
    ,UpdateProducts);

productsRouter.delete("/:id", 
    [
        authMiddleware,
        param("id").exists().isNumeric(), validate
    ],DeleteProduct);


export default productsRouter;