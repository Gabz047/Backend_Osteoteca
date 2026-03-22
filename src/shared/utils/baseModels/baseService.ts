import { Model, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from "sequelize";
import BaseRepository from "./baseRepository";

class BaseService<T extends Model> {
  protected repository: BaseRepository<T>

  constructor(repository: BaseRepository<T>) {
    this.repository = repository
  }

  findAll(options?: FindOptions) {
    return this.repository.findAll(options)
  }

  findById(id: string, options?: FindOptions) {
    return this.repository.findById(id, options)
  }

  create(
    data: Partial<T['_creationAttributes']>,
    options?: CreateOptions
  ) {
    return this.repository.create(data, options)
  }

  update(
    id: string,
    data: Partial<T['_creationAttributes']>,
    options?: UpdateOptions
  ) {
    return this.repository.update(id, data, options)
  }

  delete(id: string, options?: DestroyOptions) {
    return this.repository.delete(id, options)
  }
}

export default BaseService