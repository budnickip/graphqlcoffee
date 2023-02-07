import { ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drink.interface';

// Since typescript doesn't leave any design time metadata about implemented interfaces,
// we need to explicitly specify which interface this particular object type implements
// by implements property
// musimy to dodać
@ObjectType({ implements: () => Drink })
export class Tea implements Drink {
  name: string;
}
