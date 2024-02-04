import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDTO } from '../dto';
import { UpdateTodoDto } from '../dto';


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDTO) : Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract getById(id: number): Promise<TodoEntity>;
    abstract updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id:number): Promise<TodoEntity>;
}