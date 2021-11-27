import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { TransportClassEntity } from '../entities/transport-class.entity'
import { TransportClassService } from '../services/transport-class.service'
import { CreateTransportClassInput } from '../inputs/create-transport-class.input'
import { UpdateTransportClassInput } from '../inputs/update-transport-class.input'

// @UseGuards(GqlAuthGuard)
@Resolver('TransportClass')
export class TransportClassResolver {
  constructor(private readonly service: TransportClassService) {}

  @Mutation(() => TransportClassEntity)
  async createTransportClassEntity(
    @Args('createTransportClassInput')
    createTransportClassInput: CreateTransportClassInput,
  ): Promise<TransportClassEntity> {
    return await this.service.create(createTransportClassInput)
  }

  @Mutation(() => TransportClassEntity)
  async updateTransportClassEntity(
    @Args('updateTransportClassInput')
    updateTransportClassInput: UpdateTransportClassInput,
  ): Promise<TransportClassEntity> {
    return await this.service.update(updateTransportClassInput)
  }

  @Query(() => [TransportClassEntity])
  async getAllTransportClassEntity(): Promise<TransportClassEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => TransportClassEntity)
  async getOneTransportClassEntity(
    @Args('id') id: number,
  ): Promise<TransportClassEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => TransportClassEntity)
  async removeTransportClassEntity(
    @Args('id') id: number,
  ): Promise<TransportClassEntity> {
    return await this.service.remove(id)
  }
}
