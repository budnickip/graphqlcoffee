import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  // nest zajmuje się dependency injection za nas
  // musimy tylko przekazać odpowiedni typ do naszego konstruktora
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub, // 👈 add PubSub provider
  ) {}
  // () => [Coffee] - coś co ma zwrócić to query
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  // args -> argumenty jakie mozemy przekazac do naszego query, type
  // jakiego typu ma byc zmienna
  // domyślnie stworzy nam id jako stringa, ale dzięki ParseIntPipe,
  // przekonwertuje go nam na number za nas
  // tutaj trzeba podawać nullable jesli takie ma byc, nawet jeśli mamy włączony plugin
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  // zeby byc type safety, utworzmy createCoffeeInput
  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.create(createCoffeeInput);
  }

  //update bierze dwa argumenty, jedno to id której kawy chcemy zupdateować
  // drugie to obiekt z polami do aktualizacji
  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id);
  }

  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
