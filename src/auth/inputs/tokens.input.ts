import { Field, ObjectType } from '@nestjs/graphql'
import { ROLE } from '../../users/entities/user.entity'

@ObjectType()
export class Token {
  @Field() token: string
  @Field() exp: number
}

@ObjectType()
export class UserRes {
  @Field() email: string
  @Field({ defaultValue: ROLE.USER })
  role: ROLE
}

@ObjectType()
export class TokensInput {
  @Field() accessToken: Token
  @Field() refreshToken: Token
  @Field() user: UserRes
}
