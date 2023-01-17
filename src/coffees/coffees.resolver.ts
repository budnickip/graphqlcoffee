import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  // nest zajmuje się dependency injection za nas
  // musimy tylko przekazać odpowiedni typ do naszego konstruktora
  constructor(private readonly coffesService: CoffeesService) {}
  // () => [Coffee] - coś co ma zwrócić to query
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  // args -> argumenty jakie mozemy przekazac do naszego query, type
  // jakiego typu ma byc zmienna
  // domyślnie stworzy nam id jako stringa, ale dzięki ParseIntPipe,
  // przekonwertuje go nam na number za nas
  // tutaj trzeba podawać nullable jesli takie ma byc, nawet jeśli mamy włączony plugin
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffesService.findOne(id);
  }

  // zeby byc type safety, utworzmy createCoffeeInput
  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffesService.create(createCoffeeInput);
  }
}
