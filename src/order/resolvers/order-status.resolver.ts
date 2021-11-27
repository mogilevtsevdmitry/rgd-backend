import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrderStatusService } from '../services/order-status.service'
import { CreateOrderStatusInput } from '../inputs/create-order-status.input'
import { UpdateOrderStatusInput } from '../inputs/update-order-status.input'
import { OrderStatusEntity } from '../entities/order-status.entity'

@UseGuards(GqlAuthGuard)
@Resolver('OrderStatus')
export class OrderStatusResolver {
  constructor(private readonly service: OrderStatusService) {}

  @Mutation(() => OrderStatusEntity)
  async createOrderStatusEntity(
    @Args('createOrderStatusInput')
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatusEntity> {
    return await this.service.create(createOrderStatusInput)
  }

  @Mutation(() => OrderStatusEntity)
  async updateOrderStatusEntity(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatusEntity> {
    console.log('resolver', updateOrderStatusInput)
    return await this.service.update(updateOrderStatusInput)
  }

  @Query(() => [OrderStatusEntity])
  async getAllOrderStatusEntity(): Promise<OrderStatusEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => OrderStatusEntity)
  async getOneOrderStatusEntity(
    @Args('id') id: number,
  ): Promise<OrderStatusEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => OrderStatusEntity)
  async removeOrderStatusEntity(
    @Args('id') id: number,
  ): Promise<OrderStatusEntity> {
    return await this.service.remove(id)
  }
}
