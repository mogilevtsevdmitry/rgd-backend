import { BaseEntity } from '../../base/base.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToOne } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_description')
export class TransportDescriptionEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ nullable: false })
  description: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string

  @Field({ nullable: true })
  @Column('float', { nullable: true, default: 5 })
  rating: number

  @Field(() => TransportEntity, { nullable: true })
  @OneToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportDescriptionEntity,
  )
  transportEntity?: TransportEntity
}
