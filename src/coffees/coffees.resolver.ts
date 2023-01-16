import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  // () => [Coffee] - coś co ma zwrócić to query
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }
}
