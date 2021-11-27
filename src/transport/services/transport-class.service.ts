import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { TransportClassEntity } from '../entities/transport-class.entity'
import { CreateTransportClassInput } from '../inputs/create-transport-class.input'
import { UpdateTransportClassInput } from '../inputs/update-transport-class.input'

@Injectable()
export class TransportClassService extends CrudOperation<TransportClassEntity> {
  constructor(
    @InjectRepository(TransportClassEntity)
    public repo: Repository<TransportClassEntity>,
  ) {
    super(repo)
  }

  async create(
    createTransportClassInput: CreateTransportClassInput,
  ): Promise<TransportClassEntity> {
    return await this.repo.save({ ...createTransportClassInput })
  }

  async update(
    updateTransportClassInput: UpdateTransportClassInput,
  ): Promise<TransportClassEntity> {
    const { id } = updateTransportClassInput
    await this.repo.update({ id }, { ...updateTransportClassInput })
    return await this.getById(id)
  }

  async remove(id: number): Promise<TransportClassEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }
}
