import { Field, InputType } from '@nestjs/graphql'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator'
import { OrderEntity } from '../entities/order.entity'
import { CreateLocationInput } from './create-location.input'

@InputType()
export class CreateOrderInput extends OrderEntity {
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  price: number
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field({ nullable: false })
  qualityOfSeats: number
  @IsOptional()
  @Min(1)
  @Max(5)
  @Field({ defaultValue: 5 })
  rating: number
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
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  userEntityId: number
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  orderTransportationTypeEntityId?: number
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  orderServiceTypeEntityId?: number
}
