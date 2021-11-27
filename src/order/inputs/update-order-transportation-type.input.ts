import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateOrderTransportationTypeInput {
  @Field(() => ID) id: number
  @Field() type: string
}
