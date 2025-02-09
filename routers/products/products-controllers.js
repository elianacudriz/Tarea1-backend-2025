import { ProductEntity } from "./products-entity.js";

const productEntity = new ProductEntity();

export const GetAllProducts = (request, response) =>{
    const products = productEntity.getAll();

    return response.json({
        data:products
    })
}

export const CreateProducts = (request, response) =>{
   const product = request.body

   const newProduct = productEntity.create(product);
   return response.json({
            data: newProduct
   })
}

export const UpdateProduct = (request, response) =>{
    
    const {id} = request.params;
    const productData = request.body;

    const newProduct = productEntity.update(+id, productData);
    return response.json({
             data: newProduct
    })
 }

 export const DeleteProduct = (request, response) =>{
    
    const {id} = request.params;
    productEntity.delete(+id);

    return response.json({
             message: "Producto eliminado exitosamente"
    })
 }