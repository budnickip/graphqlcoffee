import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesResolver } from './coffees.resolver';
import { Coffee } from './entities/coffee.entity';
import { CoffeesService } from './coffees.service';
import { Flavor } from './entities/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
  // only thinks in this table could be imported in other modules
  exports: [CoffeesService],
})
export class CoffeesModule {}
