import {User} from "../../generated/prisma/client.js";

class UserDto {
    username:string;
    email:string;
    constructor(us:User) {
        this.username = us.username;
        this.email = us.email;
    }
}
export default UserDto;