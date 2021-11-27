import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class CreateOrderStatusInput {
  @IsNotEmpty()
  @Field({ nullable: false })
  status: string
  @IsOptional()
  @Field({ nullable: true })
  color?: string
}
