import { InputType, Field, Int } from '@nestjs/graphql';
import { VoteEnum } from '../vote.type';

@InputType()
export class SetVoteInput {
  @Field(Type => Int)
  voteId: number;

  @Field(type => VoteEnum)
  vote: VoteEnum;
}
