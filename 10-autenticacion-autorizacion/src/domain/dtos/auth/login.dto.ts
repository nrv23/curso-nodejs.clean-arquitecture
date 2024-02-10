import { regexp } from "../../../config";


export class LoginDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) {

    }


    static create(obj: { [key: string]: any }) : [string?, LoginDto?]  {

        const { email, password } = obj;  
        if(!email || !regexp.emailRegex.test(email)) return ["Email not valid",undefined];
        if(!password) return ["Password is required",undefined];
        if(password.length < 6) return ["Password must be at least 6 characters",undefined];

        return [undefined, new LoginDto(email,password)];
    }
}

