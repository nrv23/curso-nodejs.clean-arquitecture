import { bcryptAdapter, envs } from "../../config";
import { jwtAdapter } from "../../config/jwt-adapter";
import { UserModel } from "../../data";
import { CustomError, LoginDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from './email.service';

export class AuthService {

    constructor(
        private readonly EmailService:EmailService
    ) {}

    public async registerUser(registerUserDto: RegisterUserDto) {

    
        try {

            const existUser = await UserModel.findOne({
                email: registerUserDto.email
            });
    
            if(existUser) throw CustomError.BadRequest("Email already exists");

            const user = new UserModel(registerUserDto);

            user.password = await bcryptAdapter.hash(user.password);

            await user.save();

            // enviar el correo
             this.sendEmailValidationLink(user.email);

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

    private sendEmailValidationLink = async (email: string) =>  {

        const token = await jwtAdapter.genereteToken({
            email
        });

        if(!token) throw CustomError.InternalError("Error getting token")

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        };

        const isSent = await this.EmailService.sendEmail(options);

        if(!isSent) throw CustomError.InternalError("Email was not sent");
        return true;
    }
}