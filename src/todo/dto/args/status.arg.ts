import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArg {
  @Field(() => Boolean, {
    description: 'Filter done or undone tasks',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
