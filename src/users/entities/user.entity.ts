import { Column, Entity, OneToMany } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { BaseEntity } from '../../base/base.entity'
import { RefreshTokenEntity } from '../../auth/refresh-token.entity'
import { SOCIAL_NETWORKS } from '../../auth/interfaces'
import { OrderEntity } from '../../order/entities/order.entity'
import { TransportCommentEntity } from '../../transport/entities/transport-comment.entity'
import { TransportScheduleEntity } from '../../transport/entities/transport-schedule.entity'

export enum SEX {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ROLE {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUTSORCER = 'AUTSORCER',
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
  @Column('enum', { nullable: true, enum: SEX })
  sex: SEX

  /**
   * role пользователя
   * @default user
   */
  @Field({ nullable: true, defaultValue: ROLE.USER })
  @Column('enum', {
    nullable: true,
    enum: ROLE,
    default: ROLE.USER,
  })
  roles: ROLE

  /**
   * refresh токен - для проверки и генерации новой пары токенов
   */
  @Field(() => [RefreshTokenEntity], { nullable: true })
  @OneToMany(() => RefreshTokenEntity, (token) => token.token)
  token: RefreshTokenEntity[]

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
