import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  // inject the automatically generated repository into CoffesService using
  // mozemy teraz wstrzyknąć automatycznie generowane coffee repository dzięki InjectRepository
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}
  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = this.coffeesRepository.findOne({ where: { id: id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    // najpierw musimy utworzyć instancje klasy coffee na podstawie naszego
    // inputu
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    // teraz wystarczy tylko zapisać nową wartość w naszym repozytorium i nasze
    // nowe entity zostanie zapisane do bazy danych
    return this.coffeesRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
      // preload tworzy nowe entity na podstawie obiektu wrzuconego do niego
      // najpierw sprawdza czy takie entity istnieje juz bazie danych
      // jesli tak to je zwraca i zamienia wszystkie wartosci
      // ktore zostały przekazane w updateCoffeInput na nowe
      // jeśli id nie zostanie znalezione w bazie danych, to funkcja ta
      // zwroci undefined
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number){
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
