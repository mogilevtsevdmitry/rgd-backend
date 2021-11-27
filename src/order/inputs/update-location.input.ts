import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateLocationInput {
  @Field(() => ID) id: number
  @Field() geoLan: number
  @Field() geoLon: number
}
