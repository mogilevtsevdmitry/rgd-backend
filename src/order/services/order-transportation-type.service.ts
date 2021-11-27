import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { OrderTransportationTypeEntity } from '../entities/order-transportation-type.entity'
import { UpdateOrderTransportationTypeInput } from '../inputs/update-order-transportation-type.input'

@Injectable()
export class OrderTransportationTypeService extends CrudOperation<OrderTransportationTypeEntity> {
  constructor(
    @InjectRepository(OrderTransportationTypeEntity)
    public repo: Repository<OrderTransportationTypeEntity>,
  ) {
    super(repo)
  }

  async create(type: string): Promise<OrderTransportationTypeEntity> {
    return this.repo.save({ type: type })
  }

  async update({
    id,
    type,
  }: UpdateOrderTransportationTypeInput): Promise<OrderTransportationTypeEntity> {
    await this.repo.update({ id }, { type })
    return await this.getById(id)
  }

  async remove(id: number): Promise<OrderTransportationTypeEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
