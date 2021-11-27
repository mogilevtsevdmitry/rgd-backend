import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransportBodyTypeInput {
  @Field() type: string
}
