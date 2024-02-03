
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from '../../repositories/todo.repository';


export interface GetAllTodosUseCase {
    execute(): Promise<TodoEntity[]>;
}


export class GetAllTodos implements GetAllTodosUseCase {

    constructor(private readonly todoReposity: TodoRepository) {}

    async execute(): Promise<TodoEntity[]> {
        
        const todos = await this.todoReposity.getAll();
        return todos;
    }

}