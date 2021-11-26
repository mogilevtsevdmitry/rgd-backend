import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_transmission')
export class TransportTransmissionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [TransportEntity], { nullable: false })
  @OneToMany(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportTransmissionEntity,
  )
  transportEntities: TransportEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  transmission: string
}
