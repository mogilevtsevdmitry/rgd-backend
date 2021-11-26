import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { OrderServiceTypeEntity } from './entities/order-service-type.entity'
import { OrderStatusEntity } from './entities/order-status.entity'
import { OrderTransportationTypeEntity } from './entities/order-transportation-type.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderServiceTypeEntity,
      OrderStatusEntity,
      OrderTransportationTypeEntity,
    ]),
  ],
})
export class OrderModule {}
