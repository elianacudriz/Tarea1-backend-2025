import e from "cors";
import Users from "./user-entity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const GetAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(503)
            .json({ data: "No se pudo obtener los usuarios" });
    }
};

export const CreateUsers = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        await Users.create({ email, password: hashedPassword, name });

        const user = await Users.findOne({where:{email:email}})

        if(user){
            return res.status(400).json({data:"Usuario ya existe"});
        }

        return res.status(201).json({ data: "Usuario creado" });

        
    } catch (error) {
        return res.status(503).json({
            data: "No se pudo crear",
        });
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        await Users.update(
            { email, name, password: hashedPassword },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(202).json({ data: "Usuario Actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            data: "No se pudo actualizar",
        });
    }
};
export const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await Users.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ data: "Usuario Eliminado" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ data: "No se pudo eliminar" });
    }
};

export const Login = async (req, res) => {

    try {
        const { email, password, name } = req.body;

        const user = await Users.findOne({where:{email:email}})

        if(!user){
            return res.status(404).json({data:"Usuario no encontrado"});
        }
        const isEqual =  bcrypt.compare(password, user.password);
        if(!isEqual){
            return res.status(400).json({data: "contraseña incorrecta"});
        }

        const userId = user.id;
        const token = jwt.sign({userId},process.env.SECRET,{
            expiresIn: "1h",
        });
        return res.status(200).json({ data: { token } });

    } catch (error) {
        console.log(error);
        return resizeTo.status(500).json({data:"error no controlado"})

    }
        

};