import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_layout')
export class TransportLayoutEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [TransportEntity], { nullable: false })
  @OneToMany(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportLayoutEntity,
  )
  transportEntities: TransportEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  layout: string
}
