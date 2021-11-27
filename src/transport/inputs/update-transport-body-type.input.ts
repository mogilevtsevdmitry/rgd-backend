import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTransportBodyTypeInput {
  @Field(() => ID) id: number
  @Field() type: string
}
