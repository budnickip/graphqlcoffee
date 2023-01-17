import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  //tylko tymczasowo json
  @Column({ type: 'json' }) // z tym typeorm wie, ze ma trzymac nasza tabele jako json
  flavors: string[];
}
