import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { PubSub } from '../graphql/graphql.pubsub';

@Module({
  providers: [PubSub, VoteService, VoteResolver]
})
export class VoteModule {}
