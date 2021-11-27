import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { OrderService } from '../services/order.service'
import { OrderEntity } from '../entities/order.entity'
import { CreateOrderInput } from '../inputs/create-order.input'
import { UpdateOrderInput } from '../inputs/update-order.input'
import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { UserEntity } from '../../users/entities/user.entity'

// @UseGuards(GqlAuthGuard)
@Resolver('Order')
export class OrderResolver {
  constructor(private readonly service: OrderService) {}

  @Mutation(() => OrderEntity)
  async createOrderEntity(
    @Args('createOrderInput')
    createOrderInput: CreateOrderInput,
    @CurrentUser() userEntity: UserEntity,
  ): Promise<OrderEntity> {
    return await this.service.create(createOrderInput, userEntity)
  }

  @Mutation(() => OrderEntity)
  async updateOrderEntity(
    @Args('updateOrderInput')
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderEntity> {
    return await this.service.update(updateOrderInput)
  }

  @Query(() => [OrderEntity])
  async getAllOrderEntity(): Promise<OrderEntity[]> {
    return await this.service.getAll()
  }

  @Query(() => OrderEntity)
  async getOneOrderEntity(@Args('id') id: number): Promise<OrderEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => OrderEntity)
  async removeOrderEntity(@Args('id') id: number): Promise<OrderEntity> {
    return await this.service.remove(id)
  }
}
