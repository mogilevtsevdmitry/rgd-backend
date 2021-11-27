import { Field, InputType } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { CreateLocationInput } from './create-location.input'

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  price: number
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field({ nullable: false })
  qualityOfSeats: number
  @IsNotEmpty()
  @Field(() => [CreateLocationInput])
  locationEntity: CreateLocationInput[]
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  transportEntityId: number
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  orderStatusEntityId: number
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  orderTransportationTypeEntityId?: number
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  orderServiceTypeEntityId?: number
}
