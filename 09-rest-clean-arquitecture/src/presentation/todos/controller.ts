import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { CreateTodo, UpdateTodo, GetAllTodos, GetById, DeleteTodo, CustomError } from "../../domain";
import { CreateTodoDTO, UpdateTodoDto } from "../../domain/dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) { }

    private handleError = (res: Response, error: unknown) => {
        
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: "Internal Server Error"});
    }

    public getTodos = (req: Request, res: Response) => {

        new GetAllTodos(this.todoRepository)
            .execute()
            .then(response => res.json(response))
            .catch(error => this.handleError(res,error));
    };

    public getTodoById = (req: Request, res: Response) => {

        const { id } = req.params;
        new GetById(this.todoRepository)
            .execute(+id)
            .then(response => res.json(response))
            .catch(error => this.handleError(res,error));

    };

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDTO.create(req.body);

        if (error)
            return res.status(400).json({
                message: error,
            });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(response => res.status(201).json(response))
            .catch(error => this.handleError(res,error));

    };

    public updateTodo = (req: Request, res: Response) => {


        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({
            ...req.body,
            id: +id,
        });

        if (error) return res.status(400).json(error);

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(response => res.json(response))
            .catch(error => this.handleError(res,error));

    };

    public deleteTodo = (req: Request, res: Response) => {

        const { id } = req.params;
        new DeleteTodo(this.todoRepository)
            .execute(+id)
            .then(response => res.json(response))
            .catch(error => this.handleError(res,error));

    };
}
