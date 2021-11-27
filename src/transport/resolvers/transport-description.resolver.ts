import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileInterceptor } from '@nestjs/platform-express'
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard'
import { TransportDescriptionService } from '../services/transport-description.service'
import { TransportDescriptionEntity } from '../entities/transport-description.entity'
import { CreateTransportDescriptionInput } from '../inputs/create-transport-description.input'
import { UpdateTransportDescriptionInput } from '../inputs/update-transport-description.input'

// @UseGuards(GqlAuthGuard)
@Resolver('TransportDescription')
export class TransportDescriptionResolver {
  constructor(private readonly service: TransportDescriptionService) {}

  @Mutation(() => TransportDescriptionEntity)
  @UseInterceptors(FileInterceptor('file'))
  async createTransportDescriptionEntity(
    @Args('createTransportDescriptionInput')
    createTransportDescriptionInput: CreateTransportDescriptionInput,
    @UploadedFile() file,
  ): Promise<TransportDescriptionEntity> {
    return await this.service.create(createTransportDescriptionInput, file)
  }

  @Mutation(() => TransportDescriptionEntity)
  async updateTransportDescriptionEntity(
    @Args('updateTransportDescriptionInput')
    updateTransportDescriptionInput: UpdateTransportDescriptionInput,
    @UploadedFile() file,
  ): Promise<TransportDescriptionEntity> {
    return await this.service.update(updateTransportDescriptionInput, file)
  }

  @Query(() => [TransportDescriptionEntity])
  async getAllTransportDescriptionEntity(): Promise<
    TransportDescriptionEntity[]
  > {
    return await this.service.getAll()
  }

  @Query(() => TransportDescriptionEntity)
  async getOneTransportDescriptionEntity(
    @Args('id') id: number,
  ): Promise<TransportDescriptionEntity> {
    return await this.service.getById(id)
  }

  @Mutation(() => TransportDescriptionEntity)
  async removeTransportDescriptionEntity(
    @Args('id') id: number,
  ): Promise<TransportDescriptionEntity> {
    return await this.service.remove(id)
  }
}
