
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from '../../repositories/todo.repository';


export interface GetByIdTodosUseCase {
    execute(id: number): Promise<TodoEntity>;
}


export class GetById implements GetByIdTodosUseCase {

    constructor(private readonly todoReposity: TodoRepository) { }

    async execute(id: number): Promise<TodoEntity> {

        return await this.todoReposity.getById(id);
    }

}