import { Request, Response } from "express";
import { prisma } from "../../data/postgres/init";
import { CreateTodoDTO, UpdateTodoDto } from "../../domain/dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
    constructor(private readonly todoRepository: TodoRepository) { }

    public getTodos = async (req: Request, res: Response) => {
        return res.json({
            todos: await this.todoRepository.getAll(),
        });
    };

    public getTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const todo = await this.todoRepository.getById(+id);
            return res.json(todo);
        } catch (error) {
            return res.status(400).json({ error });
        }
    };

    public createTodo = async (req: Request, res: Response) => {
        try {
            const [error, createTodoDto] = CreateTodoDTO.create(req.body);

            if (error)
                return res.status(400).json({
                    message: error,
                });

            const newTodo = await this.todoRepository.create(createTodoDto!);
            return res.json(newTodo);
        } catch (error) {
            return res.status(400).json({ error });
        }
    };

    public updateTodo = async (req: Request, res: Response) => {

        try {
            
            const id = req.params.id;
            const [error, updateTodoDto] = UpdateTodoDto.update({
                ...req.body,
                id: +id,
            });

            if (error) return res.status(400).json({ error });

            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
            return res.json(updatedTodo);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error });
        }

    };

    public deleteTodo = async (req: Request, res: Response) => {
       
        try {
            
            const { id } = req.params;
            const deletedTodo = await this.todoRepository.deleteById(+id);
            return res.json(deletedTodo);

        } catch (error) {
            return res.status(400).json({ error });
        }
    };
}
