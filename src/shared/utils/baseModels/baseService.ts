import { Model, Transaction } from "sequelize";
import BaseRepository from "./baseRepository";

class BaseService<T extends Model> {
    protected repository: BaseRepository<T>

    constructor(repository: BaseRepository<T>) {
        this.repository = repository
    }

    findAll() {
        return this.repository.findAll()
    }

    findById(id: string) {
        return this.repository.findById(id)
    }

    create(data: Partial<T['_creationAttributes']>) {
        return this.repository.create(data)
    }

    update(id: string, data: Partial<T['_creationAttributes']>) {
        return this.repository.update(id, data)
    }

    delete(id: string) {
        return this.repository.delete(id)
    }
}

export default BaseService