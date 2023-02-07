import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';

@InputType()
export class CreateCoffeeInput {
  // reguła zostanie automatycznie dodana do update-coffee
  // przez Partial type funckje
  @MinLength(3)
  name: string;
  brand: string;
  // @Field() <- required when CLI plugin is disabled
  flavors: string[];
  type: CoffeeType;
}
