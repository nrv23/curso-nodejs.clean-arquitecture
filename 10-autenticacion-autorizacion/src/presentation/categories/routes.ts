import { Router } from "express";
import { envs } from "../../config";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "./controller";




export class CategoryRoutes {
  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const { newCategory, getCategory } = new CategoryController(categoryService);
    // Definir las rutas
    router.post("/", newCategory /**/);
    router.get("/", getCategory /**/);

    return router;
  }
}
