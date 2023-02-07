import { registerEnumType } from '@nestjs/graphql';

export enum CoffeeType {
  ARABICA = 'Arabica',
  ROBUSTA = 'Robusta',
}
//name is optional
registerEnumType(CoffeeType, {
  name: 'CoffeeType',
});
