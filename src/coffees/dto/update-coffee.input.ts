import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from './create-coffee.input';

// pamiętaj inputType jest wazny zeby zapewnic, ze nasza klasa automatycznie
// wygenerowana w schema file
@InputType()
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {}
