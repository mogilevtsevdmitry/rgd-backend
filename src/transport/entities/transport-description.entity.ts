import { BaseEntity } from '../../base/base.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToOne } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_description')
export class TransportDescriptionEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'float' })
  rating: number

  @Field(() => TransportEntity, { nullable: false })
  @OneToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportDescriptionEntity,
  )
  transportEntity: TransportEntity
}
