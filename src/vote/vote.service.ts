import { readFileSync, writeFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { SetVoteInput } from './dto/set-vote.input';
import { VoteEnum, VoteType } from './vote.type';
import { CreateVoteInput } from './dto/create-vote.input';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const filePath = path.join(process.cwd(), `src/vote/entity/vote.json`);
@Injectable()
export class VoteService {
  constructor(@Inject('PUB_SUB') private readonly pubSub: RedisPubSub) {}
  private getVoteById(id: number) {
    const votes = this.getVotes();
    return votes.find(vote => vote.id === id);
  }

  private getVotes(): VoteType[] {
    const jsonData = readFileSync(filePath).toString();
    return JSON.parse(jsonData);
  }

  private updateVotesFile(newVotes: VoteType[]) {
    writeFileSync(filePath, JSON.stringify(newVotes));
  }

  createVote(input: CreateVoteInput) {
    const votes = this.getVotes();
    const newVote = {
      id: Math.round(Math.random() * 10),
      title: 'My First Vote' || input.title,
      ayes: 0,
      noes: 0
    };
    votes.push(newVote);
    this.updateVotesFile(votes);
    return newVote;
  }

  async setVote(input: SetVoteInput) {
    const votes = this.getVotes();
    const voteIndex = votes.findIndex(vote => vote.id === input.voteId);
    if (voteIndex != -1) {
      if (input.vote === VoteEnum.YES) {
        votes[voteIndex].ayes += 1;
        await this.pubSub.publish(`VOTE_ADDED_${input.voteId}`, { voteAdded: votes[voteIndex] });
      }
      if (input.vote === VoteEnum.NO) {
        votes[voteIndex].noes += 1;
        await this.pubSub.publish(`VOTE_ADDED_${input.voteId}`, { voteAdded: votes[voteIndex] });
      }
      this.updateVotesFile(votes);
    }
    return votes[voteIndex] || null;
  }
}
