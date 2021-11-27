import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from './order.entity'

@ObjectType()
@Entity('order_service_types')
export class OrderServiceTypeEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [OrderEntity], { nullable: 'itemsAndList' })
  @OneToMany(
    () => OrderEntity,
    (orderEntity) => orderEntity.orderServiceTypeEntity,
  )
  orderEntities?: OrderEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  type: string
}
