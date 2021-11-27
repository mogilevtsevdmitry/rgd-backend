import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTransportClassInput {
  @Field(() => ID) id: number
  @Field() class: string
}
