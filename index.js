import express, { response } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import usersRouter from "./routers/users/user-router.js";
import productsRouter from "./routers/products/products-router.js";


const app = express();

app.use(cors());
app.use(morgan());
app.use(bodyParser());


app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get("/",(request, response)=>{
response.json({
    message:"Hola mundo pervertido, lleno de violencia y desamor",
})
});
app.listen(8000, ()=> {
console.log("App running on port 8000");
});