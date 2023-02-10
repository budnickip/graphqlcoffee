import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';

// default is singleton scope
// request scope signifies that a new instance of this provider will be created exlusively
// for each incoming request
// each newly created instance is also automatically garbage collected after the request
// has been completed processing
@Injectable({ scope: Scope.REQUEST })
// number which signifies a type for our key(in thi class key here relates to a coffee id)
// and second argument, array of Flavor entity which indicates the return type of our loader
// essentially we're signifying what our data loader is going to load
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    // call the super() method to execute the constructor in our inherited class
    // super method requires us to pass in an arrow function that will be used
    // by the dataloader to batch and cache our records
    // here, we'll pass keys down to a batch load function method
    // one important thing to note here is that the type of the keys argument
    // in our arrow function is an array of numbers, since the batch function
    // takes an array of batched IDs
    super((keys) => this.batchLoadFn(keys));
  }
  // readonly number[] this is a type that is expected by the data loader class and the type we specified
  // earlier when we originally extended our class with the DataLoader
  // Flavor[][] - the reason we need to have a two dimensional array here is that the array we return from this method
  // must have the same length as the input array - our coffee IDs
  // therefore, data loader will be able to connect corresponding flavors to the appropriate Coffees by doing so.
  // if we run into an incident where the number of items in the array does not match.
  // Data loader will throw an exception for us, as something must have gone wrong.
  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.coffeesRepository.find({
      select: ['id'], // since we don't really need a coffee object here
      relations: ['flavors'], // to fetch related flavors
      where: {
        id: In(coffeeIds as number[]), // to make sure we only query requested coffees
      },
    });

    // to map an array of coffees two a 2-dimensional array of flavors where position in the array indicates to which
    // coffee flavors belong
    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
