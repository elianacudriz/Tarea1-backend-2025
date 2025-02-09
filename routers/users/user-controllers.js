import { UserEntity } from "./user-entity.js";

const userEntity = new UserEntity();

export const GetAllUsers = (request, response) =>{
    const users = userEntity.getAll();

    return response.json({
        data:users
    })
}

export const CreateUsers = (request, response) =>{
   const user = request.body

   const newUser = userEntity.create(user);
   return response.json({
            data: newUser
   })
}

export const UpdateUser = (request, response) =>{
    
    const {id} = request.params;
    const userData = request.body;

    const newUser = userEntity.update(+id, userData);
    return response.json({
             data: newUser
    })
 }

 export const DeleteUser = (request, response) =>{
    
    const {id} = request.params;

    userEntity.delete(+id);

    return response.json({
             message: "Usuario eliminado exitosamente"
    })
 }