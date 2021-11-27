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
import { OrderService } from './services/order.service'
import { OrderResolver } from './resolvers/order.resolver'
import { LocationEntity } from './entities/location.entity'
import { LocationService } from './services/location.service'
import { TransportModule } from '../transport/transport.module'

@Module({
  imports: [
    TransportModule,
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderServiceTypeEntity,
      OrderStatusEntity,
      OrderTransportationTypeEntity,
      LocationEntity,
    ]),
  ],
  providers: [
    OrderServiceTypeService,
    OrderStatusService,
    OrderTransportationTypeService,
    OrderService,
    OrderServiceTypeResolver,
    OrderStatusResolver,
    OrderTransportationTypeResolver,
    OrderResolver,
    LocationService,
  ],
})
export class OrderModule {}
