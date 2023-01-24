import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VoteModule } from './vote/vote.module';
import { PubSub } from './graphql/graphql.pubsub';

@Module({
  imports: [
    VoteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
      introspection: true,
      debug: true,
      cache: 'bounded',
      persistedQueries: false,
      csrfPrevention: true,
      installSubscriptionHandlers: true
    })
  ],
  providers: [PubSub]
})
export class AppModule {}
