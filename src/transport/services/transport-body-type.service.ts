import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { TransportBodyTypesEntity } from '../entities/transport-body-types.entity'
import { CreateTransportBodyTypeInput } from '../inputs/create-transport-body-type.input'
import { UpdateTransportBodyTypeInput } from '../inputs/update-transport-body-type.input'

@Injectable()
export class TransportBodyTypeService extends CrudOperation<TransportBodyTypesEntity> {
  constructor(
    @InjectRepository(TransportBodyTypesEntity)
    public repo: Repository<TransportBodyTypesEntity>,
  ) {
    super(repo)
  }

  async create(
    createTransportBodyTypeInput: CreateTransportBodyTypeInput,
  ): Promise<TransportBodyTypesEntity> {
    return await this.repo.save({ ...createTransportBodyTypeInput })
  }

  async update(
    updateTransportBodyTypeInput: UpdateTransportBodyTypeInput,
  ): Promise<TransportBodyTypesEntity> {
    const { id } = updateTransportBodyTypeInput
    await this.repo.update({ id }, { ...updateTransportBodyTypeInput })
    return await this.getById(id)
  }

  async remove(id: number): Promise<TransportBodyTypesEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
