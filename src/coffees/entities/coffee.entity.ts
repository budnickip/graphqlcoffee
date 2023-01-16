import { ObjectType } from '@nestjs/graphql';

// ObjectType, bez tego nie moglibyśmy zwrócić go w resolverze
@ObjectType()
export class Coffee {
  // bez graphql cli pluginu, musielibyśmy definiować tutaj typ
  // kazdej kolumny za pomoca dekoratorow Field,
  // tak jak robilismy to w rest api
  id: number;
  name: string;
  brand: string;
  // @Field(() => [String]) niby to musialoby byc bez pluginy
  flavors: string[];
}
