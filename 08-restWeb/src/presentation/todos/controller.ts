import { Request, Response } from 'express';

const todos = [
    { id: 1, text: "test 1", createdAt: new Date() },
    { id: 2, text: "test 2", createdAt: null },
    { id: 3, text: "test 3", createdAt: new Date() },
];

export class TodosController {

    public getTodos = (req: Request,res: Response) => {

        return res.json({
            todos
        });
    }


    public getTodoById = (req: Request,res: Response) => {

        const { id } = req.params;
        const todo = todos.find(todo => todo.id === +id);

        if(!todo) return res.status(404).json({
            todo: null
        });

        return res.json({
            todo
        })
    }

    public createTodo = (req:Request, res: Response) => {

        const { text } = req.body;

        if(!text) return res.status(400).json({
            message:"Text is required"
        })

        const obj = {
            createdAt: new Date(),
            text,
            id: todos.length + 1
        };

        todos.push(obj);


        return res.json(obj);
    } 
}