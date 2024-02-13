import { Router } from "express";
import { envs } from "../../config";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const emailService: EmailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      !envs.SEND_EMAIL
    );
    const authService = new AuthService(emailService);
    const { login, validateEmail, register } = new AuthController(authService);

    const router = Router();

    // Definir las rutas
    router.post("/login", login);
    router.post("/register", register);
    router.get("/validate-email/:token", validateEmail);

    return router;
  }
}
