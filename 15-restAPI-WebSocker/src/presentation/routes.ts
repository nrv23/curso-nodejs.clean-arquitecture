import { Router } from 'express';
import { TicketRoutes } from './tickets/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();


    router.use('/ticket', TicketRoutes.routes);
    return router;
  }


}

