import { NextFunction, Request, Response } from 'express';
import { jwtAdapter } from '../../config/jwt-adapter';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';




export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        try {

            const authorization = req.get("Authorization");

            if (!authorization) return res.status(401).json({
                error: "No token provided"
            });

            if (!authorization.startsWith("Bearer ")) return res.status(401).json({
                error: "Invalid Token"
            });

            const token = authorization.split(" ")[1] || '';
            const payload = await jwtAdapter.validateToken<{ id: string }>(token);

            if (!payload) return res.status(401).json({
                error: "Invalid Token"
            });

            const { id } = payload;

            const user = await UserModel.findById(id);

            if (!user) return res.status(401).json({
                error: "Invalid Token - user"
            });

            req.body.user = UserEntity.fromObject(user);

            return next();


        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }
}