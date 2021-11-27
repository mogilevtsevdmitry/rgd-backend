import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CrudOperation } from '../../base/crud-operation'
import { TransportCommentEntity } from '../entities/transport-comment.entity'
import { CreateTransportCommentInput } from '../inputs/create-transport-comment.input'
import { UpdateTransportCommentInput } from '../inputs/update-transport-comment.input'
import { TransportService } from './transport.service'
import { UserEntity } from '../../users/entities/user.entity'

@Injectable()
export class TransportCommentService extends CrudOperation<TransportCommentEntity> {
  constructor(
    @InjectRepository(TransportCommentEntity)
    public repo: Repository<TransportCommentEntity>,
    private readonly transportService: TransportService,
  ) {
    super(repo)
  }

  async create(
    { transportEntityId, comment, rating }: CreateTransportCommentInput,
    userEntity: UserEntity,
  ): Promise<TransportCommentEntity> {
    const transportEntity = await this.transportService.getById(
      transportEntityId,
    )
    return await this.repo.save({
      comment,
      rating: await this.calculateRating(transportEntity, rating),
      transportEntity,
      userEntity,
    })
  }

  async update({
    id,
    rating,
    comment,
  }: UpdateTransportCommentInput): Promise<TransportCommentEntity> {
    const transportEntity = await this.repo.findOne(
      { id },
      { select: ['transportEntity'] },
    )
    await this.repo.update(
      { id },
      {
        rating: await this.calculateRating(transportEntity, rating),
        comment,
      },
    )
    return await this.getById(id)
  }

  async remove(id: number): Promise<TransportCommentEntity> {
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
