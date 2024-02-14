import { Router } from "express";
import { envs } from "../../config";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";


export class ProductRoutes {
    static get routes(): Router {

        const router = Router();
        const service = new ProductService();
        const { createProduct, getProducts } = new ProductController(service);

        // Definir las rutas
        router.post("/", createProduct);
        router.get("/", getProducts);


        return router;
    }
}
