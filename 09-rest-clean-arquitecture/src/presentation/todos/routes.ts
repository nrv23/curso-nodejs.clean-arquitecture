import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from '../../infraestructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infraestructure/repositories/todo.repository';

const dataSource = new TodoDataSourceImpl();
const todoRepository = new TodoRepositoryImpl(dataSource);

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = new TodosController(todoRepository);

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