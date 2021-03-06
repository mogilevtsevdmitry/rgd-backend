import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../../base/base.entity'
import { OrderStatusEntity } from './order-status.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { OrderTransportationTypeEntity } from './order-transportation-type.entity'
import { OrderServiceTypeEntity } from './order-service-type.entity'
import { TransportEntity } from '../../transport/entities/transport.entity'
import { LocationEntity } from './location.entity'

@ObjectType()
@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Field({ nullable: false, defaultValue: 0 })
  @Column('float', { nullable: false })
  price: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  qualityOfSeats: number

  @Field({ nullable: false })
  @Column('float', { nullable: false })
  rating: number

  @Field(() => TransportEntity, { nullable: false })
  @ManyToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.orderEntities,
  )
  transportEntity: TransportEntity

  @Field(() => OrderStatusEntity, { nullable: false })
  @ManyToOne(
    () => OrderStatusEntity,
    (orderStatusEntity) => orderStatusEntity.orderEntities,
  )
  orderStatusEntity: OrderStatusEntity

  @Field(() => UserEntity, { nullable: false })
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.orderEntities)
  userEntity: UserEntity

  @Field(() => OrderTransportationTypeEntity, { nullable: true })
  @ManyToOne(
    () => OrderTransportationTypeEntity,
    (orderTransportationTypeEntity) =>
      orderTransportationTypeEntity.orderEntities,
  )
  orderTransportationTypeEntity?: OrderTransportationTypeEntity

  @Field(() => OrderServiceTypeEntity, { nullable: true })
  @ManyToOne(
    () => OrderServiceTypeEntity,
    (orderServiceTypeEntity) => orderServiceTypeEntity.id,
  )
  orderServiceTypeEntity?: OrderServiceTypeEntity

  @Field(() => [LocationEntity], { nullable: 'itemsAndList' })
  @OneToMany(
    () => LocationEntity,
    (locationEntity) => locationEntity.orderEntity,
  )
  locationEntities?: LocationEntity[]
}
