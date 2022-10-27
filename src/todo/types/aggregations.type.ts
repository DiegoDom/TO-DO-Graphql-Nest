import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType({ description: 'TODO quick aggregations' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;
}
