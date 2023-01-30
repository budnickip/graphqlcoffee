import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

//kazda klasa z decoratorem entity reprezentuje naszą tabalę w SQLU, tabela w sqlu będzie
// taka sama jak nazwa naszej klasy z małych liter, tutaj będzie coffee
@Entity()
// ObjectType, bez tego nie moglibyśmy zwrócić go w resolverze
@ObjectType()
export class Coffee {
  @PrimaryGeneratedColumn() // columna w tabeli
  @Field((type) => ID) // ale czasami jeśli to nie jest defaultowy typ, to musimy go zadeklarować
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // pozwala na określenie owner side dla tej relacji
  @JoinTable()
  // kazda kawa moze miec kilka smakow
  // nowy dekorator, do tworzenia relacji ManyToMany
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees /* inverse side */, {
    // jak tak zrobimy, to podczas tworzenia nowej kawy, możemy podać flavors, które zostaną dodane do tabeli flavors(dzięki temu nie musimy sami wypełniać tabeli flavors jakimiś dziwnymi migracjami)
    // cascade: true,
  })
  // zmien tablice stringów, na tablicę Flavor
  flavors?: Flavor[];
}
