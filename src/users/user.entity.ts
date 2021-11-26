import { Column, Entity, OneToMany } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { BaseEntity } from '../base/base.entity'
import { RefreshTokenEntity } from '../auth/refresh-token.entity'
import { SOCIAL_NETWORKS } from '../auth/interfaces'
import { OrderEntity } from '../order/entities/order.entity'
import { TransportCommentEntity } from '../transport/entities/transport-comment.entity'
import { TransportScheduleEntity } from '../transport/entities/transport-schedule.entity'

enum SEX {
  MALE = 'male',
  FEMALE = 'female',
}

enum ROLE {
  SUPERADMIN = 'super admin',
  ADMIN = 'admin',
  USER = 'user',
  OPERATOR = 'operator',
  AUTSORCER = 'autsorcer',
}

/**
 * Сущность пользователя
 */
@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
  /**
   * Email пользователя
   */
  @Field({ nullable: false })
  @Column()
  email: string

  /**
   * Пароль пользователя
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string

  /**
   * Телефон пользователя
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string

  /**
   * Признак активации пользователя
   */
  @Field({ defaultValue: false })
  @Column({ default: false })
  isActivated: boolean

  /**
   * хэш строка для активации по почте
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  activateHash: string

  /**
   * Имя
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string

  /**
   * Фамилия
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string

  /**
   * Фото пользователя
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string

  /**
   * Источник аутентификации
   */
  @Field({ nullable: true, defaultValue: SOCIAL_NETWORKS.DEFAULT })
  @Column('enum', { nullable: true, name: 'created_by', enum: SOCIAL_NETWORKS })
  createdBy: string

  /**
   * Пол пользователя
   */
  @Field({ nullable: true, defaultValue: null })
  @Column('enum', { nullable: true, name: 'sex', enum: SEX })
  sex: string

  /**
   * refresh токен - для проверки и генерации новой пары токенов
   */
  @Field(() => [RefreshTokenEntity], { nullable: true })
  @OneToMany(() => RefreshTokenEntity, (token) => token.token)
  token: RefreshTokenEntity[]

  /**
   * role пользователя
   * @default user
   */
  @Field({ nullable: false })
  @Column('enum', {
    nullable: false,
    array: true,
    default: [ROLE.USER],
    enum: ROLE,
  })
  role: ROLE[]

  /**
   * заявка
   */
  @Field(() => [OrderEntity], { nullable: false })
  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.userEntity)
  orderEntities: OrderEntity[]

  @Field(() => [TransportCommentEntity], { nullable: false })
  @OneToMany(
    () => TransportCommentEntity,
    (transportCommentEntity) => transportCommentEntity.userEntity,
  )
  transportCommentEntities: TransportCommentEntity[]

  @Field(() => [TransportScheduleEntity], { nullable: false })
  @OneToMany(
    () => TransportScheduleEntity,
    (TransportCommentEntity) => TransportCommentEntity.userEntity,
  )
  transportScheduleEntities: TransportScheduleEntity[]
}
