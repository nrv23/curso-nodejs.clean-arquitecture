

import { Request, Response, NextFunction } from 'express';


export class TypeMiddleware {

    static checkFileType(validTypes: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {

            const { type } = req.params;

            if (!["products", "users", "categories"].includes(type)) return res.status(400).json({
                message: "Invalid type"
            })

            next();
        }

    }
}