import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArg } from './dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Recolectar la piedra del alma', done: false },
    { id: 2, description: 'Recolectar la piedra del espacio', done: false },
    { id: 3, description: 'Recolectar la piedra del tiempo', done: true },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll({ status }: StatusArg): Todo[] {
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo)
      throw new NotFoundException(`There is not records with ID ${id}`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((t) => t.id), 0) + 1;

    this.todos = [...this.todos, todo];

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;

    const todo = this.findOne(id);

    if (description) todo.description = description;
    if (done !== undefined) todo.done = done;

    this.todos = this.todos.map((t) => (t.id === id ? todo : t));

    return todo;
  }

  remove(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
