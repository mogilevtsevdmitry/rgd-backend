import { BaseEntity } from '../../base/base.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../../users/entities/user.entity'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_comments')
export class TransportCommentEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ type: 'text', nullable: false })
  comment: string

  @Field({ nullable: false, defaultValue: 5 })
  @Column('float', { nullable: false, default: 5 })
  rating: number

  @Field(() => UserEntity)
  @ManyToOne(
    () => UserEntity,
    (userEntity) => userEntity.transportCommentEntities,
  )
  @JoinColumn()
  userEntity: UserEntity

  @Field(() => TransportEntity)
  @ManyToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportCommentEntities,
  )
  @JoinColumn()
  transportEntity: TransportEntity
}
