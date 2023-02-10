import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// ten resolver mógłby być dodany do coffess.resolver, ale lepiej jest dzielić kod
// szczególnie w przypadku duzych aplikacji

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader) {}
  // 'flavors' name naszego resolvera, musimy tez przekazac co ten resolver zwroci
  @ResolveField('flavors', () => [Flavor])
  // @Parent -> referencja do parent obiektu w naszym field resolverze
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    // Using the injected repository,
    // let’s retrieve ALL flavors that belong to a “parent coffee”.
    // queryBuilder pozwala tworzyć zapytania SQLowe w type safe sposób
    // innerJoin, zeby sie upewnic, ze zwracamy tylko smaki, ktore naleza do danej kawy
    // sprawwdzamy czay coffeeId ktore przekazemy do naszego resolvera, jest takie samo
    // jak parent coffee id
    // getMany - wywoła zapytanie i zwroci wszystkie flavors
    // return this.flavorsRepository
    //   .createQueryBuilder('flavor')
    //   .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
    //     coffeeId: coffee.id,
    //   })
    //   .getMany();
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
