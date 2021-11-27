import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderServiceTypeService } from '../services/order-service-type.service'
import { OrderServiceTypeEntity } from '../entities/order-service-type.entity'
import { UpdateOrderServiceTypeInput } from '../inputs/update-order-service-type.input'

@UseGuards(GqlAuthGuard)
@Resolver('OrderServiceType')
export class OrderServiceTypeResolver {
  constructor(private readonly service: OrderServiceTypeService) {}

  @Mutation(() => OrderServiceTypeEntity)
  async createOrderServiceTypeEntity(
    @Args('type') type: string,
  ): Promise<OrderServiceTypeEntity> {
    return await this.service.create(type)
  }

  @Mutation(() => OrderServiceTypeEntity)
  async updateOrderServiceTypeEntity(
    @Args('orderServiceTypeInput')
    orderServiceTypeInput: UpdateOrderServiceTypeInput,
  ): Promise<OrderServiceTypeEntity> {
    return await this.service.update(orderServiceTypeInput)
  }

  @Query(() => [OrderServiceTypeEntity])
  async getAllOrderServiceTypeEntity(): Promise<OrderServiceTypeEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => OrderServiceTypeEntity)
  async getOneOrderServiceTypeEntity(
    @Args('id') id: number,
  ): Promise<OrderServiceTypeEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => OrderServiceTypeEntity)
  async removeOrderServiceTypeEntity(
    @Args('id') id: number,
  ): Promise<OrderServiceTypeEntity> {
    return await this.service.remove(id)
  }
}
