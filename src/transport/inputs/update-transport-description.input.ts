import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTransportDescriptionInput {
  @Field(() => ID) id: number
  @Field() description: string
  @Field({ nullable: true, defaultValue: 5 }) rating: number
}
