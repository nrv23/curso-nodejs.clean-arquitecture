import { Router } from "express";
import { TodosController } from "./controller";

const { getTodos, getTodoById, createTodo } = new TodosController();

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();


        router.get("/", getTodos);
        router.get("/:id", getTodoById);
        router.post("/", createTodo)

        return router;
    }
}