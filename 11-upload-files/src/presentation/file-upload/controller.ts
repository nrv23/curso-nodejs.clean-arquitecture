import { Response, Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';



export class FileUploadController {

    // DI
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }


        return res.status(500).json({ error: 'Internal server error' });
    };


    uploadFile = (req: Request, res: Response) => {


        const { type } = req.params;
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadFile(file, `uploads/${type}`)
            .then(response => {

                res.json(response);
            })
            .catch(err => this.handleError(err, res));


    };

    uploadFileMultiple = (req: Request, res: Response) => {

        const { type } = req.params;
        this.fileUploadService.uploadFileMultiple(req.body.files[0], `uploads/${type}`)
            .then(response => {

                res.json(response);
            })
            .catch(err => this.handleError(err, res));

    };


}