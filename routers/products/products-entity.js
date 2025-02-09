export class ProductEntity{

    products = [
        {
            id:1,
            name: "Producto 1",
            description: "Descripcion producto uno"
        },
        {
            id:2,
            name: "Producto 2",
            description: "Descripcion producto dos"
        },
        {
            id:3,
            name: "Producto 3",
            description: "Descripcion producto tres"
        },
        {
            id:4,
            name: "Producto 4",
            description: "Descripcion producto cuatro"
        },
        
    ]

    getAll(){
        return this.products;
    }

    getById(id){
        return this.users.find((u)=> u.id === id);
    }

    create(products){
        const newProduct = {id: this.products.length + 1 ,name: products.name, description: products.description};
        this.products.push(newProduct);
        return newProduct;
    }

    update(id, productData){
        const newProducts = this.products.filter((u)=> u.id != id);
        const updated = {id:id, name:productData.name, description:productData.description}
        newProducts.push(updated);
        this.products = newProducts;
        return updated;
    
    }

    delete(id){
        this.products = this.products.filter((u)=> u.id !== id);
    }
};