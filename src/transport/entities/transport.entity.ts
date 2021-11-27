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
import { LocationEntity } from '../../order/entities/location.entity'

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
  @Column({ nullable: true, name: 'tank_capacity' })
  tankCapacity: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  capacity: number

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'max_speed' })
  maxSpeed: number

  @Field({ nullable: false })
  @Column({ nullable: false })
  year: number

  @Field({ nullable: true })
  @Column('float', { nullable: true, name: 'avg_fuel_consumption' })
  avgFuelConsumption: number

  @Field({ nullable: false })
  @Column({ nullable: false, name: 'quantity_of_seats' })
  quantityOfSeats: number

  @Field({ nullable: false })
  @Column({ nullable: false, name: 'gos_number' })
  gosNumber: string

  @Field(() => TransportClassEntity, { nullable: true, name: 'classId' })
  @ManyToOne(
    () => TransportClassEntity,
    (transportClassEntity) => transportClassEntity.transportEntities,
  )
  transportClassEntity: TransportClassEntity

  @Field(() => TransportBodyTypesEntity, {
    nullable: true,
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

  @Field(() => [TransportCommentEntity], { nullable: false })
  @OneToMany(
    () => TransportCommentEntity,
    (transportCommentEntity) => transportCommentEntity.transportEntity,
  )
  transportCommentEntities: TransportCommentEntity[]

  @Field(() => TransportDescriptionEntity, { nullable: true })
  @OneToOne(
    () => TransportDescriptionEntity,
    (transportDescriptionEntity) => transportDescriptionEntity.transportEntity,
  )
  transportDescriptionEntity?: TransportDescriptionEntity

  @Field(() => [TransportScheduleEntity], { nullable: true })
  @OneToMany(
    () => TransportScheduleEntity,
    (transportScheduleEntity) => transportScheduleEntity.transportEntity,
  )
  transportScheduleEntities?: TransportScheduleEntity[]

  @Field(() => [LocationEntity], { nullable: 'itemsAndList' })
  @OneToMany(
    () => LocationEntity,
    (locationEntity) => locationEntity.transportEntity,
  )
  locationEntities: LocationEntity[]

  @Field(() => [OrderEntity], { nullable: true })
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.transportEntity)
  orderEntities: OrderEntity[]
}
