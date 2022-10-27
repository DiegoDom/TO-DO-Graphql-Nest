import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Describe the task you have to work on' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
