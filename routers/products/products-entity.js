import { DataTypes } from "sequelize"
import { Database } from "../../database/db.js";

const database = new Database();
const Products = database.db.define("Products", {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },

    description:{
        type: DataTypes.STRING,
        allowNull:false  
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull:false  
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull:false  
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull:false  
    }
})
Products.sync();
export default Products;