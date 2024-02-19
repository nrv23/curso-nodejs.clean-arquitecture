import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/fileUpload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router();
        const service = new FileUploadService
        const controller = new FileUploadController(service);
        router.use(AuthMiddleware.validateJWT);
        router.use(FileUploadMiddleware.containFiles);


        // Definir las rutas
        router.post('/single/:type', [AuthMiddleware.validateJWT], controller.uploadFile);
        router.post('/multiple/:type', [TypeMiddleware.checkFileType(["products", "users", "categories"])], controller.uploadFileMultiple);




        return router;
    }


}

