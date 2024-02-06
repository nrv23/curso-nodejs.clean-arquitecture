import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthController } from './controller';





export class AuthRoutes {


    static get routes(): Router {

        const authService = new AuthService();
        const {
            login,
            validateEmail,
            register
        } = new AuthController(authService);

        const router = Router();

        // Definir las rutas
        router.post('/login', login);
        router.post('/register', register);
        router.get('/validate-email/:token', validateEmail);



        return router;
    }


}

