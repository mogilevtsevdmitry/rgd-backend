import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { TransportCommentService } from '../services/transport-comment.service'
import { TransportCommentEntity } from '../entities/transport-comment.entity'
import { CreateTransportCommentInput } from '../inputs/create-transport-comment.input'
import { UpdateTransportCommentInput } from '../inputs/update-transport-comment.input'
import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { UserEntity } from '../../users/entities/user.entity'

// @UseGuards(GqlAuthGuard)
@Resolver('TransportComment')
export class TransportCommentResolver {
  constructor(private readonly service: TransportCommentService) {}

  @Mutation(() => TransportCommentEntity)
  async createTransportCommentEntity(
    @Args('createTransportCommentInput')
    createTransportCommentInput: CreateTransportCommentInput,
    @CurrentUser() userEntity: UserEntity,
  ): Promise<TransportCommentEntity> {
    return await this.service.create(createTransportCommentInput, userEntity)
  }

  @Mutation(() => TransportCommentEntity)
  async updateTransportCommentEntity(
    @Args('updateTransportCommentInput')
    updateTransportCommentInput: UpdateTransportCommentInput,
  ): Promise<TransportCommentEntity> {
    return await this.service.update(updateTransportCommentInput)
  }

  @Query(() => [TransportCommentEntity])
  async getAllTransportCommentEntity(): Promise<TransportCommentEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => TransportCommentEntity)
  async getOneTransportCommentEntity(
    @Args('id')
    id: number,
  ): Promise<TransportCommentEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => TransportCommentEntity)
  async removeTransportCommentEntity(
    @Args('id')
    id: number,
  ): Promise<TransportCommentEntity> {
    return await this.service.remove(id)
  }
}
