import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransportEntity } from './entities/transport.entity'
import { TransportBodyTypesEntity } from './entities/transport-body-types.entity'
import { TransportClassEntity } from './entities/transport-class.entity'
import { TransportCommentEntity } from './entities/transport-comment.entity'
import { TransportDescriptionEntity } from './entities/transport-description.entity'
import { TransportEngineEntity } from './entities/transport-engine.entity'
import { TransportLayoutEntity } from './entities/transport-layout.entity'
import { TransportOilTypeEntity } from './entities/transport-oil-type.entity'
import { TransportScheduleEntity } from './entities/transport-schedule.entity'
import { TransportStatusesEntity } from './entities/transport-statuses.entity'
import { TransportTransmissionEntity } from './entities/transport-transmission.entity'
import { TransportWheelFormulaEntity } from './entities/transport-wheel-formula.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransportEntity,
      TransportBodyTypesEntity,
      TransportClassEntity,
      TransportCommentEntity,
      TransportDescriptionEntity,
      TransportEngineEntity,
      TransportLayoutEntity,
      TransportOilTypeEntity,
      TransportScheduleEntity,
      TransportStatusesEntity,
      TransportTransmissionEntity,
      TransportWheelFormulaEntity,
    ]),
  ],
})
export class TransportModule {}