import { Resolver, Subscription, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { VoteType } from './vote.type';
import { CreateVoteInput } from './dto/create-vote.input';
import { SetVoteInput } from './dto/set-vote.input';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver(() => VoteType)
export class VoteResolver {
  constructor(
    private readonly voteService: VoteService,
    @Inject('PUB_SUB') private readonly pubSub: RedisPubSub
  ) {}

  @Mutation(returns => VoteType)
  createVote(@Args('input') input: CreateVoteInput) {
    return this.voteService.createVote(input);
  }

  @Mutation(returns => VoteType, { nullable: true })
  setVote(@Args('input') input: SetVoteInput) {
    return this.voteService.setVote(input);
  }

  @Subscription(returns => VoteType)
  async voteAdded(@Args('voteId', { type: () => Int }) voteId: number) {
    return await this.pubSub.asyncIterator(`VOTE_ADDED_${voteId}`);
  }

  @Query(returns => Boolean)
  test() {
    return true;
  }
}
