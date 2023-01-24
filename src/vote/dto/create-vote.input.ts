import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field()
  title: string;
}
