import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './categories/routes';
import { AuthMiddleware } from './middlewares/auth.middleware';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    router.use("/auth", AuthRoutes.routes);
    router.use("/category", AuthMiddleware.validateJWT, CategoryRoutes.routes);

    return router;
  }


}

