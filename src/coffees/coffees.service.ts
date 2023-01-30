import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  // mozemy teraz wstrzyknąć automatycznie generowane coffee repository dzięki InjectRepository
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    // jeśli taki smak istnieje juz w bazie to go zwróc, jak nie to go utwórz
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ name });
  }

  async findAll() {
    return this.coffeesRepository.find({ relations: { flavors: true } });
  }

  async findOne(id: number) {
    const coffee = this.coffeesRepository.findOne({
      where: { id: id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    // Promise.all pozwoli nam poczekać az cała tablica promisów zostanie wykonana
    // zanim zostanie wykonywana dalsza część kodu
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    // teraz juz tylko musimy połączyć nasz createCoffeeInput wraz z nową
    // tablicą encji flavors
    const coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    // najpierw musimy utworzyć instancje klasy coffee na podstawie naszego
    // inputu
    // const coffee = this.coffeesRepository.create(createCoffeeInput);
    // teraz wystarczy tylko zapisać nową wartość w naszym repozytorium i nasze
    // nowe entity zostanie zapisane do bazy danych
    return this.coffeesRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    // pamiętaj ze tutaj flavors jest opcjonalne
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });
    // preload tworzy nowe entity na podstawie obiektu wrzuconego do niego
    // najpierw sprawdza czy takie entity istnieje juz bazie danych
    // jesli tak to je zwraca i zamienia wszystkie wartosci
    // ktore zostały przekazane w updateCoffeInput na nowe
    // jeśli id nie zostanie znalezione w bazie danych, to funkcja ta
    // zwroci undefined
    // const coffee = await this.coffeesRepository.preload({
    //   id,
    //   ...updateCoffeeInput,
    // });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
