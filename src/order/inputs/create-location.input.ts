import { Field, InputType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class CreateLocationInput {
  @Field() geoLan: number
  @Field() geoLon: number
  @IsOptional()
  @Field({ nullable: true })
  transportEntityId?: number
  @IsOptional()
  @Field({ nullable: true })
  orderEntityId?: number
}
