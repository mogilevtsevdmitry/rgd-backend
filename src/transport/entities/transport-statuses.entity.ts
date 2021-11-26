import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_statuses')
export class TransportStatusesEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [TransportEntity], { nullable: false })
  @OneToMany(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportStatusesEntity,
  )
  transportEntities: TransportEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  status: string

  @Field({ nullable: false, defaultValue: '#3dadff' })
  @Column({ nullable: false })
  color: string
}
