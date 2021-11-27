import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { OrderEntity } from '../entities/order.entity'
import { CreateOrderInput } from '../inputs/create-order.input'
import { UpdateOrderInput } from '../inputs/update-order.input'
import { LocationService } from './location.service'
import { UserEntity } from '../../users/entities/user.entity'
import { OrderServiceTypeService } from './order-service-type.service'
import { OrderStatusService } from './order-status.service'
import { OrderTransportationTypeService } from './order-transportation-type.service'
import { TransportService } from '../../transport/services/transport.service'

@Injectable()
export class OrderService extends CrudOperation<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    public repo: Repository<OrderEntity>,
    private readonly locationService: LocationService,
    private readonly orderServiceTypeService: OrderServiceTypeService,
    private readonly orderStatusService: OrderStatusService,
    private readonly orderTransportationTypeService: OrderTransportationTypeService,
    private readonly transportService: TransportService,
  ) {
    super(repo)
  }

  async create(
    createOrderInput: CreateOrderInput,
    userEntity: UserEntity,
  ): Promise<OrderEntity> {
    const {
      orderServiceTypeEntityId,
      orderStatusEntityId,
      orderTransportationTypeEntityId,
      transportEntityId,
      price,
      qualityOfSeats,
      locationEntity,
    } = createOrderInput
    const orderServiceTypeEntity = await this.orderServiceTypeService.getById(
      orderServiceTypeEntityId,
    )
    const orderStatusEntity = await this.orderStatusService.getById(
      orderStatusEntityId,
    )
    const orderTransportationTypeEntity =
      await this.orderTransportationTypeService.getById(
        orderTransportationTypeEntityId,
      )
    const transportEntity = await this.transportService.getById(
      transportEntityId,
    )
    const _order = await this.repo.save({
      price,
      qualityOfSeats,
      locationEntity,
      orderServiceTypeEntity,
      orderStatusEntity,
      orderTransportationTypeEntity,
      transportEntity,
      userEntity,
    })
    const locations = createOrderInput.locationEntity
    for (const locationsKey in locations) {
      await this.locationService.create({
        ...locations[locationsKey],
        orderEntityId: _order.id,
        transportEntityId,
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
