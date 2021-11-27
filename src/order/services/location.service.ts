import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { LocationEntity } from '../entities/location.entity'
import { CreateLocationInput } from '../inputs/create-location.input'
import { UpdateLocationInput } from '../inputs/update-location.input'
import { TransportService } from '../../transport/services/transport.service'
import { OrderService } from './order.service'

@Injectable()
export class LocationService extends CrudOperation<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    public repo: Repository<LocationEntity>,
    private readonly transportService: TransportService,
    private readonly orderService: OrderService,
  ) {
    super(repo)
  }

  async create({
    geoLon,
    geoLan,
    transportEntityId,
    orderEntityId,
  }: CreateLocationInput): Promise<LocationEntity> {
    const transportEntity = await this.transportService.getById(
      transportEntityId,
    )
    const orderEntity = await this.orderService.getById(orderEntityId)
    return this.repo.save({ geoLan, geoLon, orderEntity, transportEntity })
  }

  async update(
    updateLocationInput: UpdateLocationInput,
  ): Promise<LocationEntity> {
    const { id, geoLon, geoLan } = updateLocationInput
    await this.repo.update({ id }, { geoLon, geoLan })
    return await this.getById(id)
  }

  async remove(id: number): Promise<LocationEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
