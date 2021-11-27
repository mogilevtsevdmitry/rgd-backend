import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { TransportBodyTypeService } from '../services/transport-body-type.service'
import { TransportBodyTypesEntity } from '../entities/transport-body-types.entity'
import { CreateTransportBodyTypeInput } from '../inputs/create-transport-body-type.input'
import { UpdateTransportBodyTypeInput } from '../inputs/update-transport-body-type.input'

@UseGuards(GqlAuthGuard)
@Resolver('TransportBodyType')
export class TransportBodyTypeResolver {
  constructor(private readonly service: TransportBodyTypeService) {}

  @Mutation(() => TransportBodyTypesEntity)
  async createTransportBodyTypeEntity(
    @Args('createTransportInput')
    createTransportInput: CreateTransportBodyTypeInput,
  ): Promise<TransportBodyTypesEntity> {
    return await this.service.create(createTransportInput)
  }

  @Mutation(() => TransportBodyTypesEntity)
  async updateTransportBodyTypeEntity(
    @Args('updateTransportInput')
    updateTransportInput: UpdateTransportBodyTypeInput,
  ): Promise<TransportBodyTypesEntity> {
    return await this.service.update(updateTransportInput)
  }

  @Query(() => [TransportBodyTypesEntity])
  async getAllTransportBodyTypeEntity(): Promise<TransportBodyTypesEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => TransportBodyTypesEntity)
  async getOneTransportBodyTypeEntity(
    @Args('id') id: number,
  ): Promise<TransportBodyTypesEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => TransportBodyTypesEntity)
  async removeTransportBodyTypeEntity(
    @Args('id') id: number,
  ): Promise<TransportBodyTypesEntity> {
    return await this.service.remove(id)
  }
}
