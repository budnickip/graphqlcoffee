import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // zeby cala aplikacja mogla korzystać z graphqla, musimy dodać:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // miejsce w którym będzie się generowała schema
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
