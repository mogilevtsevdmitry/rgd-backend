import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransportClassInput {
  @Field() class: string
}
