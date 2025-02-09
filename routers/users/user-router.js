import { Router } from "express";
import{middlewareCustom  } from "../../middlewares/middlewareCustom.js";
import { CreateUsers, GetAllUsers, UpdateUser, DeleteUser } from "./user-controllers.js";

const usersRouter = Router();

usersRouter.get("/", [middlewareCustom], GetAllUsers);

usersRouter.post("/", CreateUsers);

usersRouter.patch("/:id", UpdateUser);

usersRouter.delete("/:id", DeleteUser);


export default usersRouter;