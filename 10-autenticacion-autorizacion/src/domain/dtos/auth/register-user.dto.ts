import { regexp } from "../../../config";


export class RegisterUserDto {

    private constructor(

        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { name, email, password } = obj;
      
        if (!name) return ["Name is requred", undefined];
        if (!email) return ["Email is required", undefined];
        if (!regexp.emailRegex.test(email)) return ["Invalid Email", undefined];
        if (!password) return ["Password is requred", undefined];
        if(password.length < 6) return ["Password too short", undefined];

        return [undefined, new RegisterUserDto(name, email, password )];
    }

}