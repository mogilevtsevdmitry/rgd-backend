import { Repository } from 'typeorm'

export abstract class CrudOperation<T extends { id?: number }> {
  protected constructor(public repo: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.repo.find()
  }

  async getById(id: number): Promise<T> {
    return await this.repo.findOne({ id })
  }
}
