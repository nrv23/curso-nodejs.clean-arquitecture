import { bcryptAdapter } from "../../config";
import { jwtAdapter } from "../../config/jwt-adapter";
import { UserModel } from "../../data";
import { CustomError, LoginDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

    constructor() {

    }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({
            email: registerUserDto.email
        });

        if(existUser) throw CustomError.BadRequest("Email already exists");

        try {

            const user = new UserModel(registerUserDto);

            user.password = await bcryptAdapter.hash(user.password);

            await user.save();

            const { password, ...rest } = UserEntity.fromObject(user);
            // omite el password al desestructurarlo y luego el operador ...rest

            return {
                token: "123",
                user: rest
            };

        } catch (error) {
            throw CustomError.InternalError(`${error}`);
        }
    }


    public async loginUser(loginDto: LoginDto) {

        try {

            const user = await UserModel.findOne({
                email: loginDto.email
            });

            if(!user) throw CustomError.NotFound("Email/Password inconrrect");
            if(!(await bcryptAdapter.compare(loginDto.password,user.password))) {

                throw CustomError.BadRequest("Email/Password inconrrect"); 
            }

            const { password, ...rest } = UserEntity.fromObject(user);
            const token = await jwtAdapter.genereteToken({
                id: rest.id,
                email: rest.email
            });

            if(!token) throw CustomError.InternalError("Error creating JWT");

            return {
                user: {...rest},
                token
            }
            
        } catch (error) {
            throw CustomError.InternalError(`${error}`);
        }
    }
}