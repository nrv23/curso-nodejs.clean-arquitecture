import { CustomError } from './../../domain/errors/custom.error';
import { Request, Response } from 'express';
import { LoginDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';
import { MongoDatabase } from '../../data/mongo/mongo-database';

export class AuthController {

    constructor(

        public readonly authService: AuthService
    ) {

    }

    private handleError = (error: unknown, res:Response) => {

        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        } 

        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }

    register = (req:Request, res: Response) => {

        const [error,dto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({error});

        this.authService.registerUser(dto!)
            .then(response => {
                return res.status(201).json(response);
            })
            .catch(err => {
                return this.handleError(err,res);
            })
    };


    login = (req:Request, res: Response) => {

        const [error,dto] = LoginDto.create(req.body);

        if(error) return res.status(400).json({error});

        this.authService.loginUser(dto!)
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(err => {
                return this.handleError(err,res);
            })
    };


    validateEmail = (req:Request, res: Response) => {


        const { token } = req.params;

        res.json({
            message: token
        })
    };

}