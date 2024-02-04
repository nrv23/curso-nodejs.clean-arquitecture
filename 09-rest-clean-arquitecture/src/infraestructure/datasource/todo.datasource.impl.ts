import { prisma } from "../../data/postgres/init";
import { CreateTodoDTO, TodoEntity, UpdateTodoDto } from "../../domain";
import { TodoDataSource } from "../../domain/datasources/todo.datasource";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) throw "Todo with id " + id + " not found";
    return TodoEntity.fromObject(todo);
  }
  async updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updatedTodoDto.id);

    const updated = await prisma.todo.update({
      where: {
        id: updatedTodoDto.id,
      },
      data: updatedTodoDto!.values,
    });

    return TodoEntity.fromObject(updated);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deleted = await prisma.todo.delete({
      where: {
        id: +id,
      },
    });

    return TodoEntity.fromObject(deleted);
  }
}
