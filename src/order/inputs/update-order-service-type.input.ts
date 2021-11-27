import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateOrderServiceTypeInput {
  @Field(() => ID) id: number
  @Field() type: string
}
