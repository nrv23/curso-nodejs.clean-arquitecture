import { Request, Response, NextFunction } from 'express';


export class FileUploadMiddleware {

    static containFiles(req: Request, res: Response, next: NextFunction) {

        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({
            message: "File no provided"
        });


        if (!Array.isArray(req.body.files)) {
            req.body.files = [req.files.file];
        } else {
            req.body.files = req.files.file;
        }


        next();
    }
}