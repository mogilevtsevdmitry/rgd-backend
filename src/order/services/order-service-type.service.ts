import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrderServiceTypeEntity } from '../entities/order-service-type.entity'
import { CrudOperation } from '../../base/crud-operation'
import { UpdateOrderServiceTypeInput } from '../inputs/update-order-service-type.input'

@Injectable()
export class OrderServiceTypeService extends CrudOperation<OrderServiceTypeEntity> {
  constructor(
    @InjectRepository(OrderServiceTypeEntity)
    public repo: Repository<OrderServiceTypeEntity>,
  ) {
    super(repo)
  }

  async create(type: string): Promise<OrderServiceTypeEntity> {
    return this.repo.save({ type: type })
  }

  async update({
    id,
    type,
  }: UpdateOrderServiceTypeInput): Promise<OrderServiceTypeEntity> {
    await this.repo.update({ id }, { type })
    return await this.getById(id)
  }

  async remove(id: number): Promise<OrderServiceTypeEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
