import { Server } from "socket.io";
import Products from "../routers/products/products-entity.js";

export class SocketHandler{
    iosocket;
        /**
     *
     * 1 evento que emite el frontend para actualizar el stock y lo escucha el backend
     * 1 evento que emite el backend para devolver el stock actualizado y que escucha el frontend
     * El backend escucha update-stock
     * El backend emite el stock-updated
     */
    constructor(serverHttp){
        this.iosocket = new Server(serverHttp);
        this.initEvents();
    }

    initEvents(){
        this.iosocket.on("connection", (socket)=>{
            console.log("Cliente conectado");
            socket.on("update-stock",async (payload)=>{
                const{productId} = payload;

                const resp = await this.updateProductStock(productId);
                if(!resp){
                    socket.emit("error", "No existe el producto");
                }
            });

            socket.on("update-product-price", async ({ productId, newPrice }) => {
                const updatedProduct = await this.updateProductPrice(productId, newPrice); 
            
                if (updatedProduct) {
                    socket.emit("product-price-updated", updatedProduct); 
                }
            });

            socket.on("disconnect", () => {
                console.log("Cliente disconnected");
            });
        });
    }

    async updateProductStock(productId){
        const exist = await Products.findOne({where:{id:productId}})

        if(!exist){
            return null;
        }

        const updateProduct = ({...exist, stock:exist.stock -1 });

        Products.update(updateProduct,{
            where:{
                id:productId
            }
        });
        const newProduct = await Products.findOne({where:{id:productId}})
        this.iosocket.emit("stock-updated", newProduct);
    }

    async updateProductPrice(productId, newPrice) {
        const exist = await Products.findOne({ where: { id: productId } });
    
        if (!exist) {
            return null;
        }
        console.log('Actualizando precio ProducId' + productId, 'a ' + newPrice)

        await Products.update({ price: newPrice }, { where: { id: productId } });
    
        const updatedProduct = await Products.findOne({ where: { id: productId } });

        this.iosocket.emit("price-updated", updatedProduct);
    
        return updatedProduct;
    }
    
}