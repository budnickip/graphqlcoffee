import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesResolver } from './coffees.resolver';
import { Coffee } from './entities/coffee.entity';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  providers: [CoffeesResolver, CoffeesService],
})
export class CoffeesModule {}
