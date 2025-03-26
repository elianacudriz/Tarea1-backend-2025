import Products from "./products-entity.js";
import e from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Valkey from "iovalkey";
import { configDotenv } from "dotenv";
configDotenv();


export const GetAllProducts = async (req, res) => {
    try {

        const products = await Products.findAll();
            return res.status(200).json({
                data: products,
            });
  
    } catch (error) {
        console.log(error);
        return res
            .status(503)
            .json({ data: "No se pudo obtener los productos" });
    }
};

export const CreateProducts= async (req, res) => {
    try {
        const { name, description, stock, price,active} = req.body;

        const product = await Products.findOne({where:{name:name}})

        if(product){
            return res.status(400).json({data:"Producto ya existe"});
        }

        await Products.create({ name, description, stock, price,active });
        return res.status(201).json({ data: "Producto creado" });

        
    } catch (error) {
        return res.status(503).json({
            data: "No se pudo crear",
        });
    }
};

export const UpdateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, stock, price,active } = req.body;

        await Products.update(
            { name, description, stock, price,active },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(202).json({ data: "Producto Actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            data: "No se pudo actualizar el producto",
        });
    }
};
export const DeleteProduct = async (req, res) => {
    
    try {
        const { id } = req.params;
        await Products.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ data: "Producto Eliminado" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ data: "No se pudo eliminar el producto" });
    }
};

