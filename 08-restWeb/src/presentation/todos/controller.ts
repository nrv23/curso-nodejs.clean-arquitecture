import { Request, Response } from 'express';
import { prisma } from '../../data/postgres/init';
import { CreateTodoDTO, UpdateTodoDto } from '../../domain/dto';

export class TodosController {

    public getTodos = async (req: Request, res: Response) => {

        return res.json({
            todos: await prisma.todo.findMany()
        });
    }


    public getTodoById = async (req: Request, res: Response) => {

        const { id } = req.params;
        const todo = await prisma.todo.findFirst({
            where: {
                id: +id
            }
        })

        if (!todo) return res.status(404).json({
            todo: null
        });

        return res.json({
            todo
        })
    }

    public createTodo = async (req: Request, res: Response) => {


        const [error, createTodoDto] = CreateTodoDTO.create(req.body)

        if (error) return res.status(400).json({
            message: error
        })


        const { text = '' } = createTodoDto!;

        if (!text) return res.status(400).json({
            message: "Text is required"
        })

        const obj = {
            completedAt: null,
            text: text
        };

        const newTodo = await prisma.todo.create({
            data: obj
        });

        return res.json(newTodo);
    }


    public updateTodo = async (req: Request, res: Response) => {

        const id = req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({
            ...req.body, id
        });

        if (error) return res.status(400).json({ error });

        const { text, completedAt } = updateTodoDto!

        const exist = await prisma.todo.findFirst({
            where: {
                id: +id
            }
        });

        if (!exist) return res.status(404).json({
            message: `Todo with id ${id} not exists`
        });


        const updated = await prisma.todo.update({
            where: {
                id: +id
            },
            data: updateTodoDto!.values
        })

        return res.status(200).json({
            todo: updated
        });
    }


    public deleteTodo = async (req: Request, res: Response) => {

        const { id } = req.params;

        if (!id || isNaN(+id)) return res.status(400).json({
            message: "Parameter id is invalid"
        });


        const todo = await prisma.todo.findFirst({
            where: {
                id: +id
            }
        })

        if (!todo) return res.status(404).json({
            message: `Todo with id ${id} not exists`
        });

        return res.status(200).json({
            todos: await prisma.todo.delete({
                where: {
                    id: +id
                }
            })
        })
    }
}