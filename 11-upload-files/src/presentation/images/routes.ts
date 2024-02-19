import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ImagesController } from './controller';


export class ImagesRoutes {


    static get routes(): Router {

        const { getImage } = new ImagesController();
        const router = Router();
        router.use(AuthMiddleware.validateJWT);


        // Definir las rutas
        //router.post('/single/:type', [AuthMiddleware.validateJWT], controller.uploadFile);
        //router.post('/multiple/:type', [TypeMiddleware.checkFileType(["products", "users", "categories"])], controller.uploadFileMultiple);

        router.get("/:type/:img", getImage)


        return router;
    }


}

