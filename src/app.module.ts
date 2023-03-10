import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { DateScalar } from './common/scalars/date.scalar';
import { DrinkModule } from './drinks/drinks.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      // dzięki temu w konsoli mozemy zobaczyc jakie zapytania szly do bazy
      // logging: ['query'],
    }),
    // zeby cala aplikacja mogla korzystać z graphqla, musimy dodać:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // miejsce w którym będzie się generowała schem
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    CoffeesModule,
    DrinkModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
