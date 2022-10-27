import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'My first Graphql resolver',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hello world from Graphql';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Generate a random number',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Generate a random number from zero to any number',
  })
  getRandomFromZeroTo(
    @Args('max', { type: () => Int, defaultValue: 10 }) max: number,
  ): number {
    return Math.floor(Math.random() * max);
  }
}
