import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { CreateTodo, UpdateTodo, GetAllTodos, GetById, DeleteTodo } from "../../domain";
import { CreateTodoDTO, UpdateTodoDto } from "../../domain/dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) { }

    public getTodos = (req: Request, res: Response) => {

        new GetAllTodos(this.todoRepository)
            .execute()
            .then( response => res.json(response))
            .catch(error => {
                if(error instanceof PrismaClientKnownRequestError) {
                    res.status(500).json(error)
                } else {
                    res.status(400).json(error);
                }
            });
    };

    public getTodoById = (req: Request, res: Response) => {

        const { id } = req.params;
        new GetById(this.todoRepository)
            .execute(+id)
            .then( response => res.json(response))
            .catch(error => {

                res.status(400).json(error)
            });

    };

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDTO.create(req.body);

        if (error)
            return res.status(400).json({
                message: error,
            });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then( response => res.status(201).json(response))
            .catch(error => res.status(400).json(error));

    };

    public updateTodo =  (req: Request, res: Response) => {


        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id: +id,
        });

        if (error) return res.status(400).json(error);

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then( response => res.json(response))
            .catch(error => res.status(400).json(error));

    };

    public deleteTodo =  (req: Request, res: Response) => {

        const { id } = req.params;
        new DeleteTodo(this.todoRepository)
            .execute(+id)
            .then( response => res.json(response))
            .catch(error => res.status(400).json(error));

    };
}
