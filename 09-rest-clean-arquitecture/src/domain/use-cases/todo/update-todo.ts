import { UpdateTodoDto } from "../../dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from '../../repositories/todo.repository';


export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}


export class UpdateTodo implements UpdateTodoUseCase {

    constructor(private readonly todoReposity: TodoRepository) {}

    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoReposity.updateById(dto);
    }

}