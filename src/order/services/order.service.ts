import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { OrderEntity } from '../entities/order.entity'
import { CreateOrderInput } from '../inputs/create-order.input'
import { UpdateOrderInput } from '../inputs/update-order.input'
import { LocationService } from './location.service'

@Injectable()
export class OrderService extends CrudOperation<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    public repo: Repository<OrderEntity>,
    private readonly locationService: LocationService,
  ) {
    super(repo)
  }

  async create(createOrderInput: CreateOrderInput): Promise<OrderEntity> {
    const _order = await this.repo.save({ ...createOrderInput })
    const locations = createOrderInput.locationEntity
    for (const locationsKey in locations) {
      await this.locationService.create({
        ...locations[locationsKey],
        orderEntityId: _order.id,
        transportEntityId: _order.transportEntityId,
      })
    }
    return _order
  }

  async update(order: UpdateOrderInput): Promise<OrderEntity> {
    const { id, price, rating, qualityOfSeats, updateLocationInput } = order
    await this.locationService.update({ ...updateLocationInput })
    await this.repo.update({ id }, { price, rating, qualityOfSeats })
    return await this.getById(id)
  }

  async remove(id: number): Promise<OrderEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
