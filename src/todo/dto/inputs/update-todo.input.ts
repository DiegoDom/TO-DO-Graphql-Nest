import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'Task ID' })
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Describe the task you have to work on',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    description: 'Mark your task as done or undone',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
