import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

    constructor() {

    }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({
            email: registerUserDto.email
        });

        if(existUser) throw CustomError.BadRequest("Email already exists ");

        try {

            const user = new UserModel(registerUserDto);
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
}