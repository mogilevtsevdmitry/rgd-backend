import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from './order.entity'

@ObjectType()
@Entity()
export class OrderStatusEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [OrderEntity], { nullable: false })
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.orderStatusEntity)
  orderEntities: OrderEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  type: string

  @Field({ nullable: false, defaultValue: '#fff' })
  @Column({ nullable: false, default: '#fff' })
  color: string
}
