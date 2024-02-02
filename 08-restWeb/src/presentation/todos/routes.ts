import { Router } from "express";
import { TodosController } from "./controller";

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = new TodosController();

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();


        router.get("/", getTodos);
        router.get("/:id", getTodoById);
        router.post("/", createTodo)
        router.put("/:id", updateTodo);
        router.delete("/:id", deleteTodo)

        return router;
    }
}