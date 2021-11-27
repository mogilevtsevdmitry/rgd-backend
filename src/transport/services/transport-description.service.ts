import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { TransportDescriptionEntity } from '../entities/transport-description.entity'
import { CreateTransportDescriptionInput } from '../inputs/create-transport-description.input'
import { UpdateTransportDescriptionInput } from '../inputs/update-transport-description.input'
import { FilesService } from '../../files/files.service'
import { TransportService } from './transport.service'

@Injectable()
export class TransportDescriptionService extends CrudOperation<TransportDescriptionEntity> {
  constructor(
    @InjectRepository(TransportDescriptionEntity)
    public repo: Repository<TransportDescriptionEntity>,
    private readonly filesService: FilesService,
    private readonly transportService: TransportService,
  ) {
    super(repo)
  }

  async create(
    { description, rating, transportEntityId }: CreateTransportDescriptionInput,
    file,
  ): Promise<TransportDescriptionEntity> {
    const photo = await this.filesService.createFile(file)
    const transportEntity = await this.transportService.getById(
      transportEntityId,
    )
    const avgRating = await this.calculateRating(transportEntity, rating)
    return await this.repo.save({
      description,
      rating: avgRating,
      photo,
      transportEntity,
    })
  }

  async update(
    { id, description, rating }: UpdateTransportDescriptionInput,
    file,
  ): Promise<TransportDescriptionEntity> {
    const photo = await this.filesService.createFile(file)
    const transportDescriptionEntity = await this.getById(id)
    await this.filesService.removeFile(transportDescriptionEntity.photo)
    const avgRating = await this.calculateRating(
      transportDescriptionEntity.transportEntity,
      rating,
    )
    await this.repo.update({ id }, { photo, rating: avgRating, description })
    return await this.getById(id)
  }

  async remove(id: number): Promise<TransportDescriptionEntity> {
    const _entity = await this.repo.findOne({ id })
    await this.repo.remove(_entity)
    return { ..._entity, id }
  }

  async calculateRating(transportEntity, rating: number): Promise<number> {
    const ratings = await this.repo.find({
      where: { transportEntity },
      select: ['rating'],
    })
    return (
      (ratings.map((r) => r.rating).reduce((a, b) => a + b) + rating) /
      (ratings.length + 1)
    )
  }
}
