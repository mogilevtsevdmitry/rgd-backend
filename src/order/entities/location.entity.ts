import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from '../../transport/entities/transport.entity'
import { OrderEntity } from './order.entity'

@ObjectType()
@Entity('locations')
export class LocationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('float', { name: 'geo_lan' })
  geoLan: number

  @Field()
  @Column('float', { name: 'geo_lon' })
  geoLon: number

  @Field(() => TransportEntity, { nullable: true })
  @ManyToOne(
    () => TransportEntity,
    (transportEntity) => transportEntity.locationEntities,
  )
  transportEntity?: TransportEntity

  @Field(() => OrderEntity, { nullable: true })
  @ManyToOne(() => OrderEntity, (orderEntity) => orderEntity.locationEntities)
  orderEntity?: OrderEntity
}
