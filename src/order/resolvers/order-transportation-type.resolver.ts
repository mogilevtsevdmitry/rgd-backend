import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { OrderTransportationTypeService } from '../services/order-transportation-type.service'
import { OrderTransportationTypeEntity } from '../entities/order-transportation-type.entity'
import { UpdateOrderTransportationTypeInput } from '../inputs/update-order-transportation-type.input'

// @UseGuards(GqlAuthGuard)
@Resolver('OrderTransportationType')
export class OrderTransportationTypeResolver {
  constructor(private readonly service: OrderTransportationTypeService) {}

  @Mutation(() => OrderTransportationTypeEntity)
  async createOrderTransportationTypeEntity(
    @Args('type') type: string,
  ): Promise<OrderTransportationTypeEntity> {
    return await this.service.create(type)
  }

  @Mutation(() => OrderTransportationTypeEntity)
  async updateOrderTransportationTypeEntity(
    @Args('updateOrderTransportationTypeInput')
    updateOrderTransportationTypeInput: UpdateOrderTransportationTypeInput,
  ): Promise<OrderTransportationTypeEntity> {
    return await this.service.update(updateOrderTransportationTypeInput)
  }

  @Query(() => [OrderTransportationTypeEntity])
  async getAllOrderTransportationTypeEntity(): Promise<
    OrderTransportationTypeEntity[]
  > {
    return await this.service.getAll()
  }

  @Query(() => OrderTransportationTypeEntity)
  async getOneOrderTransportationTypeEntity(
    @Args('id') id: number,
  ): Promise<OrderTransportationTypeEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => OrderTransportationTypeEntity)
  async removeOrderTransportationTypeEntity(
    @Args('id') id: number,
  ): Promise<OrderTransportationTypeEntity> {
    return await this.service.remove(id)
  }
}
