export class UpdateUserDTO {
    age;
    name;
    phoneNumber;
    email;

    constructor(user){
        this.age = user.age;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
    }


}