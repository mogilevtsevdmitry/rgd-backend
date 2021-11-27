import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator'
import { UpdateLocationInput } from './update-location.input'

@InputType()
export class UpdateOrderInput {
  @Field(() => ID) id: number
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  price: number
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: false })
  qualityOfSeats: number
  @IsOptional()
  @Min(1)
  @Max(5)
  @Field({ defaultValue: 5 })
  rating: number
  @IsNotEmpty()
  @Field({ nullable: false })
  updateLocationInput: UpdateLocationInput
}
