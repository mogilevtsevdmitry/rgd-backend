import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { TransportService } from '../services/transport.service'
import { TransportEntity } from '../entities/transport.entity'
import { CreateTransportInput } from '../inputs/create-transport.input'
import { UpdateTransportInput } from '../inputs/update-transport.input'

@UseGuards(GqlAuthGuard)
@Resolver('Transport')
export class TransportResolver {
  constructor(private readonly service: TransportService) {}

  @Mutation(() => TransportEntity)
  async createTransportEntity(
    @Args('createTransportInput')
    createTransportInput: CreateTransportInput,
  ): Promise<TransportEntity> {
    return await this.service.create(createTransportInput)
  }

  @Mutation(() => TransportEntity)
  async updateTransportEntity(
    @Args('updateTransportInput')
    updateTransportInput: UpdateTransportInput,
  ): Promise<TransportEntity> {
    return await this.service.update(updateTransportInput)
  }

  @Query(() => [TransportEntity])
  async getAllTransportEntity(): Promise<TransportEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => TransportEntity)
  async getOneTransportEntity(
    @Args('id') id: number,
  ): Promise<TransportEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => TransportEntity)
  async removeTransportEntity(
    @Args('id') id: number,
  ): Promise<TransportEntity> {
    return await this.service.remove(id)
  }
}
