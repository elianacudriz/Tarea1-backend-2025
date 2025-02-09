export class UserEntity{

    users = [
        {
            id:1,
            name: "Luis"
        },
        {
            id:2,
            name: "Juanito"
        },
        {
            id:3,
            name: "Pedrito"
        }
        
    ]

    getAll(){
        return this.users;
    }

    getById(id){
        return this.users.find((u)=> u.id === id);
    }

    create(user){
        const newUser = {name: user.name, id: this.users.length + 1 };
        this.users.push(newUser);
        return newUser;
    }

    update(id, userData){
        const newUSers = this.users.filter((u)=> u.id != id);
        const updated = {id:id, name:userData.name }
        newUSers.push(updated);

        this.users = newUSers;
        return updated;
    
    }

    delete(id){
        this.users = this.users.filter((u)=> u.id !== id);
    }
};