import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { TransportEntity } from '../entities/transport.entity'
import { CreateTransportInput } from '../inputs/create-transport.input'
import { UpdateTransportInput } from '../inputs/update-transport.input'

@Injectable()
export class TransportService extends CrudOperation<TransportEntity> {
  constructor(
    @InjectRepository(TransportEntity)
    public repo: Repository<TransportEntity>,
  ) {
    super(repo)
  }

  async create({
    transportClassEntityId,
    transportDescriptionEntityId,
    transportLayoutEntityId,
    transportTransmissionEntityId,
    transportEngineEntityId,
    transportStatusesEntityId,
    transportScheduleEntitiesId,
    transportOilTypeEntityId,
    transportBodyTypesEntityId,
    transportWheelFormulaEntityId,
    avgFuelConsumption,
    clearance,
    gosNumber,
    height,
    length,
    maxSpeed,
    modification,
    quantityOfSeats,
    wheelbase,
    tankCapacity,
    capacity,
    width,
    year,
    weight,
  }: CreateTransportInput): Promise<TransportEntity> {
    return await this.repo.save({
      avgFuelConsumption,
      clearance,
      gosNumber,
      height,
      length,
      maxSpeed,
      modification,
      quantityOfSeats,
      wheelbase,
      tankCapacity,
      capacity,
      width,
      year,
      weight,
    })
  }

  async update(
    updateTransportInput: UpdateTransportInput,
  ): Promise<TransportEntity> {
    const { id } = updateTransportInput
    await this.repo.update({ id }, { ...updateTransportInput })
    return await this.getById(id)
  }

  async remove(id: number): Promise<TransportEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
