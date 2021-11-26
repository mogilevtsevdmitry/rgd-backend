import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/base/base.entity'
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { TransportClassEntity } from './transport-class.entity'
import { TransportBodyTypesEntity } from './transport-body-types.entity'
import { TransportLayoutEntity } from './transport-layout.entity'
import { TransportWheelFormulaEntity } from './transport-wheel-formula.entity'
import { TransportEngineEntity } from './transport-engine.entity'
import { TransportTransmissionEntity } from './transport-transmission.entity'
import { TransportOilTypeEntity } from './transport-oil-type.entity'
import { TransportStatusesEntity } from './transport-statuses.entity'
import { OrderEntity } from '../../order/entities/order.entity'
import { TransportCommentEntity } from './transport-comment.entity'
import { TransportDescriptionEntity } from './transport-description.entity'
import { TransportScheduleEntity } from './transport-schedule.entity'

@ObjectType()
@Entity('transports')
export class TransportEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ nullable: false })
  modification: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  length: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  width: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  height: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  clearance: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  wheelbase: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  tank_capacity: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  capacity: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  max_speed: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  year: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  avg_fuel_consumption: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  quantity_of_seats: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  gos_number: number

  @Field(() => TransportClassEntity, { nullable: true, name: 'classId' })
  @ManyToOne(
    () => TransportClassEntity,
    (transportClassEntity) => transportClassEntity.transportEntities,
  )
  transportClassEntity: TransportClassEntity

  @Field(() => TransportBodyTypesEntity, {
    nullable: true,
    name: 'body_typeId',
  })
  @ManyToOne(
    () => TransportBodyTypesEntity,
    (transportBodyTypesEntity) => transportBodyTypesEntity.transportEntities,
  )
  transportBodyTypesEntity: TransportBodyTypesEntity

  @Field(() => TransportLayoutEntity, {
    nullable: true,
  })
  @ManyToOne(
    () => TransportLayoutEntity,
    (transportLayoutEntity) => transportLayoutEntity.transportEntities,
  )
  transportLayoutEntity: TransportLayoutEntity

  @Field(() => TransportWheelFormulaEntity, {
    nullable: true,
  })
  @ManyToOne(
    () => TransportWheelFormulaEntity,
    (transportWheelFormulaEntity) =>
      transportWheelFormulaEntity.transportEntities,
  )
  transportWheelFormulaEntity: TransportWheelFormulaEntity

  @Field(() => TransportEngineEntity, {
    nullable: true,
  })
  @ManyToOne(
    () => TransportEngineEntity,
    (transportEngineEntity) => transportEngineEntity.transportEntities,
  )
  transportEngineEntity: TransportEngineEntity

  @Field(() => TransportTransmissionEntity, { nullable: true })
  @ManyToOne(
    () => TransportTransmissionEntity,
    (transportTransmissionEntity) =>
      transportTransmissionEntity.transportEntities,
  )
  transportTransmissionEntity: TransportTransmissionEntity

  @Field(() => TransportOilTypeEntity, { nullable: true })
  @ManyToOne(
    () => TransportOilTypeEntity,
    (transportOilTypeEntity) => transportOilTypeEntity.transportEntities,
  )
  transportOilTypeEntity: TransportOilTypeEntity

  @Field(() => TransportStatusesEntity, { nullable: false })
  @ManyToOne(
    () => TransportStatusesEntity,
    (transportStatusesEntity) => transportStatusesEntity.transportEntities,
  )
  transportStatusesEntity: TransportStatusesEntity

  @Field(() => [OrderEntity], { nullable: true })
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.transportEntity)
  orderEntities: OrderEntity[]

  @Field(() => [TransportCommentEntity], { nullable: false })
  @OneToMany(
    () => TransportCommentEntity,
    (transportCommentEntity) => transportCommentEntity.transportEntity,
  )
  transportCommentEntities: TransportCommentEntity[]

  @Field(() => TransportDescriptionEntity, { nullable: false })
  @OneToOne(
    () => TransportDescriptionEntity,
    (transportDescriptionEntity) => transportDescriptionEntity.transportEntity,
  )
  transportDescriptionEntity: TransportDescriptionEntity

  @Field(() => [TransportScheduleEntity], { nullable: false })
  @OneToMany(
    () => TransportScheduleEntity,
    (transportScheduleEntity) => transportScheduleEntity.transportEntity,
  )
  transportScheduleEntities: TransportScheduleEntity[]
}
