import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Tea } from 'src/teas/entities/tea.entity';

@Injectable()
export class DrinksService {
  constructor(private readonly coffesService: CoffeesService) {}

  async findAll() {
    const coffees = await this.coffesService.findAll();
    // just for testing purposes
    // TODO: create tea module, service and resolver
    const tea = new Tea();
    tea.name = 'Lipton';
    return [tea, coffees].flat();
  }
}
