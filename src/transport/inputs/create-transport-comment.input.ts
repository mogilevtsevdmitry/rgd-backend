import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransportCommentInput {
  @Field() comment: string
  @Field({ nullable: true, defaultValue: 5 }) rating?: number
  @Field() transportEntityId: number
}
