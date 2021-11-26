import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { TransportEntity } from './transport.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { BaseEntity } from '../../base/base.entity'

/**
 * @description Планирование выезда транспорта
 */
@ObjectType()
@Entity('transport_schedule')
export class TransportScheduleEntity extends BaseEntity {
  @Field(() => TransportEntity)
  @ManyToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportScheduleEntities,
  )
  transportEntity: TransportEntity

  @Field(() => UserEntity)
  @ManyToOne(
    () => UserEntity,
    (userEntity) => userEntity.transportScheduleEntities,
  )
  userEntity: UserEntity

  @Field({ nullable: false })
  @Column({ nullable: false, type: 'timestamptz' })
  dateFor: Date

  @Field({ nullable: false })
  @Column({ nullable: false, type: 'timestamptz' })
  dateTo: Date
}
