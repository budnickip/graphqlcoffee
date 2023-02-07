import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DrinksResolver } from './drinks.resolver';
import { DrinksService } from './drinks.service';

@Module({
  imports: [CoffeesModule],
  providers: [DrinksResolver, DrinksService],
})
export class DrinkModule {}
