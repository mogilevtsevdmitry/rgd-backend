import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => ID)
  id: number
  @IsNotEmpty()
  @Field({ nullable: false })
  status: string
  @IsOptional()
  @Field({ nullable: true, defaultValue: '#ffffff' })
  color?: string
}
