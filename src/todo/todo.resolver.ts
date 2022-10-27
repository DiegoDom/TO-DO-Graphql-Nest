import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArg } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArg: StatusArg): Todo[] {
    return this.todoService.findAll(statusArg);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(
    @Args('createTodoInput', { type: () => CreateTodoInput })
    createTodoInput: CreateTodoInput,
  ): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    updateTodoInput: UpdateTodoInput,
  ): Todo {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo' })
  delete(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.remove(id);
  }

  // ? Aggregations
  @Query(() => Int, {
    name: 'totalTodos',
    description: 'Counts all registered task',
  })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, {
    name: 'completedTodos',
    description: 'Counts all done task',
  })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
    description: 'Counts all undone task',
  })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
    };
  }
}
