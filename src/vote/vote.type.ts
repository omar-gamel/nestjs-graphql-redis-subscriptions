import { Field, ObjectType, Int, ID, registerEnumType } from '@nestjs/graphql';

export enum VoteEnum {
  YES = 'YES',
  NO = ' NO'
}
registerEnumType(VoteEnum, { name: 'VoteEnum' });

@ObjectType()
export class VoteType {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field(type => Int, { nullable: true })
  ayes?: number;

  @Field(type => Int, { nullable: true })
  noes?: number;
}
