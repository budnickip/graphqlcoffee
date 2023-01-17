import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  name: string;
  brand: string;
  // @Field() <- required when CLI plugin is disabled
  flavors: string[];
}
