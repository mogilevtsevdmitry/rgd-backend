import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TransportEntity } from './transport.entity'

@ObjectType()
@Entity('transport_wheel_formula')
export class TransportWheelFormulaEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => [TransportEntity], { nullable: false })
  @OneToMany(
    () => TransportEntity,
    (transportEntity) => transportEntity.transportWheelFormulaEntity,
  )
  transportEntities: TransportEntity[]

  @Field({ nullable: false })
  @Column({ nullable: false })
  title: string
}
