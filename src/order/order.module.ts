import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { OrderServiceTypeEntity } from './entities/order-service-type.entity'
import { OrderStatusEntity } from './entities/order-status.entity'
import { OrderTransportationTypeEntity } from './entities/order-transportation-type.entity'
import { OrderServiceTypeService } from './services/order-service-type.service'
import { OrderServiceTypeResolver } from './resolvers/order-service-type.resolver'
import { OrderStatusService } from './services/order-status.service'
import { OrderStatusResolver } from './resolvers/order-status.resolver'
import { OrderTransportationTypeService } from './services/order-transportation-type.service'
import { OrderTransportationTypeResolver } from './resolvers/order-transportation-type.resolver'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderServiceTypeEntity,
      OrderStatusEntity,
      OrderTransportationTypeEntity,
    ]),
  ],
  providers: [
    OrderServiceTypeService,
    OrderStatusService,
    OrderTransportationTypeService,
    OrderServiceTypeResolver,
    OrderStatusResolver,
    OrderTransportationTypeResolver,
  ],
  exports: [OrderServiceTypeService],
})
export class OrderModule {}
