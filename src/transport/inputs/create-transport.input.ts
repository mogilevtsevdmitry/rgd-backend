import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransportInput {
  @Field() modification: string
  @Field({ nullable: true }) length?: number
  @Field({ nullable: true }) width?: number
  @Field({ nullable: true }) height?: number
  @Field({ nullable: true }) clearance?: number
  @Field({ nullable: true }) wheelbase?: number
  @Field({ nullable: true }) weight?: number
  @Field({ nullable: true }) tankCapacity?: number
  @Field({ nullable: true }) capacity?: number
  @Field({ nullable: true }) maxSpeed?: number
  @Field() year: number
  @Field({ nullable: true }) avgFuelConsumption?: number
  @Field() quantityOfSeats: number
  @Field() gosNumber: string
  @Field({ nullable: true }) transportClassEntityId?: number
  @Field() transportBodyTypesEntityId: number
  @Field() transportLayoutEntityId: number
  @Field() transportWheelFormulaEntityId: number
  @Field() transportEngineEntityId: number
  @Field({ nullable: true }) transportTransmissionEntityId?: number
  @Field({ nullable: true }) transportOilTypeEntityId?: number
  @Field({ nullable: true }) transportStatusesEntityId?: number
  @Field({ nullable: true }) transportDescriptionEntityId?: number
  @Field({ nullable: true }) transportScheduleEntitiesId?: number
}
