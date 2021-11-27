import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTransportCommentInput {
  @Field(() => ID) id: number
  @Field() comment: string
  @Field({ nullable: true, defaultValue: 5 }) rating?: number
}
