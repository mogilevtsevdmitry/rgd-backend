import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransportDescriptionInput {
  @Field() description: string
  @Field({ nullable: true, defaultValue: 5 }) rating: number
  @Field() transportEntityId: number
}
