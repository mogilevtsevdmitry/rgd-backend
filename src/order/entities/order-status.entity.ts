import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from './order.entity'

@ObjectType()
@Entity()
export class OrderStatusEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [OrderEntity], { nullable: 'itemsAndList' })
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.orderStatusEntity)
  orderEntities: OrderEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  status: string

  @Field({ nullable: true, defaultValue: '#ffffff' })
  @Column({ nullable: true, default: '#ffffff' })
  color?: string
}
