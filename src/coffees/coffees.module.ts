import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesResolver } from './coffees.resolver';
import { Coffee } from './entities/coffee.entity';
import { CoffeesService } from './coffees.service';
import { Flavor } from './entities/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [
    CoffeesResolver,
    CoffeesService,
    CoffeeFlavorsResolver,
    FlavorsByCoffeeLoader,
  ],
  // only thinks in this table could be imported in other modules
  exports: [CoffeesService],
})
export class CoffeesModule {}
