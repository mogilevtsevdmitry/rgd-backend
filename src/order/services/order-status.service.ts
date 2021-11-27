import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { OrderStatusEntity } from '../entities/order-status.entity'
import { CreateOrderStatusInput } from '../inputs/create-order-status.input'
import { UpdateOrderStatusInput } from '../inputs/update-order-status.input'

@Injectable()
export class OrderStatusService extends CrudOperation<OrderStatusEntity> {
  constructor(
    @InjectRepository(OrderStatusEntity)
    public repo: Repository<OrderStatusEntity>,
  ) {
    super(repo)
  }

  async create(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatusEntity> {
    return this.repo.save(createOrderStatusInput)
  }

  async update({
    id,
    status,
    color,
  }: UpdateOrderStatusInput): Promise<OrderStatusEntity> {
    await this.repo.update({ id }, { status, color })
    return await this.getById(id)
  }

  async remove(id: number): Promise<OrderStatusEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
