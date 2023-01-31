import { Scalar, CustomScalar } from '@nestjs/graphql';
import { ValueNode, Kind } from 'graphql';

// pierwszy parametr nazwa naszego typu, a drugi to co zostanie zwrócone
// dzięki temu Nest będzie wiedział jak mapować ten typ podczas serializaji
@Scalar('Date', () => Date)
// w CustomScalar - pierwsza wartość, bo chcemy daty jako numbery jak serializujemy
// do JSONa. This number will be resolved to a Date on the server representing
// Date value
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';
  //parseValue i parseLiteral parsują wartości które odtrzymaliśmy od clienta
  // są równiez znane jako mutations input.
  // roznica: parseValue parsuje wartość ze zmiennych które są w formacie JSON
  // parseLiteral handluje to co otrzymujemy z query, meaning
  // the inline values - which are in abstract syntaxt tree format
  // or AST for short.
  parseValue(value: number): Date {
    return new Date(value);
  }
  // ta metoda zostanie wywołana zanim response zostanie odesłany do klienta
  serialize(value: Date): number {
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
