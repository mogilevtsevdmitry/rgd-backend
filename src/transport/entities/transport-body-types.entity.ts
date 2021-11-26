import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_body_types')
export class TransportBodyTypesEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  type: string

  @Field(() => [TransportEntity], { nullable: false })
  @OneToMany(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportBodyTypesEntity,
  )
  transportEntities: TransportEntity[]
}
