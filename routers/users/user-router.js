import { Router } from "express";
import{middlewareCustom  } from "../../middlewares/middlewareCustom.js";
import { CreateUsers, GetAllUsers, UpdateUser, DeleteUser, Login } from "./user-controllers.js";
import validate from "../../middlewares/validator.js";
import{body, param} from "express-validator";
import { authMiddleware } from "../../middlewares/auth.js";

const usersRouter = Router();

usersRouter.get("/", [authMiddleware], GetAllUsers);

usersRouter.post("/",
     [
        body("name").exists().isString().isAlphanumeric(),
        body("email").exists().isString().isEmail(), 
        body("password").exists().isString().isLength({min:4}), 
         validate], CreateUsers);

usersRouter.patch("/:id", 
    [
        authMiddleware,
        param("id").exists().isNumeric(),
        body("id").not().exists(),
        body("name").optional().isString().isAlphanumeric(),
        body("email").optional().isString().isEmail(),
        body("password").optional().isString().isLength({ min: 4 }),
        validate,
        
    ]
    ,UpdateUser);

usersRouter.delete("/:id", 
    [
        param("id").exists().isNumeric(), validate
    ],DeleteUser);

usersRouter.post(
     "/login",
     [
        body("email").exists().isString().isEmail(),
        body("password").exists().isString().isLength({ min: 4 }),
        validate,
        ],
        Login
    );


export default usersRouter;