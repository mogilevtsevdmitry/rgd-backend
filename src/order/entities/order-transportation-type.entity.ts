import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from './order.entity'

@ObjectType()
@Entity('order_transportation_types')
export class OrderTransportationTypeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [OrderEntity], { nullable: false })
  @OneToMany(
    () => OrderEntity,
    (orderEntity) => orderEntity.orderTransportationTypeEntity,
  )
  orderEntities: OrderEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  type: string
}