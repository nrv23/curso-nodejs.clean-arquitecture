import { CreateTodoDTO, TodoEntity, UpdateTodoDto } from '../../domain';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoDataSource } from '../../domain/datasources/todo.datasource';


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private dataSource: TodoDataSource
    ) {

    }
    create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    getById(id: number): Promise<TodoEntity> {
        return this.dataSource.getById(id);
    }
    updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.updateById(updatedTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id);
    }

}