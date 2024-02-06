import { CustomError } from "../errors/custom.error";


export class UserEntity {

    private constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {

    }

    static fromObject(obj: { [key: string]: any }) {

        const {
            id, _id, name, email, emailValidated, password, role, img
        } = obj;

        if(!_id && !id) throw CustomError.BadRequest("Missing id");
        if(!name) throw CustomError.BadRequest("Missing name");
        if(!email) throw CustomError.BadRequest("Missing email");
        if(emailValidated === undefined) throw CustomError.BadRequest("Missing emailValidated");
        if(!password) throw CustomError.BadRequest("Missing password");
        if(!role) throw CustomError.BadRequest("Missing role");

        return new UserEntity(id || _id ,name, email, emailValidated, password, role, img);  
    }
}