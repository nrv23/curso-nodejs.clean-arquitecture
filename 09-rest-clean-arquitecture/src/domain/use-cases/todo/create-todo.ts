import { CreateTodoDTO } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from '../../repositories/todo.repository';


export interface CreateTodoUseCase {
    execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}


export class CreateTodo implements CreateTodoUseCase {

    constructor(private readonly todoReposity: TodoRepository) {}

    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.todoReposity.create(dto);
    }

}