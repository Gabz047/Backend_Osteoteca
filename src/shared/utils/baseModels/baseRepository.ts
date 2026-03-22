import {Model, ModelStatic, WhereOptions, Transaction} from 'sequelize'

class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>

    constructor(model: ModelStatic<T>) {
        this.model = model
    }

    findAll(where?: WhereOptions, transaction?: Transaction): Promise<T[]> {
        return this.model.findAll({ where, transaction })
    }

    findById(id: string, transaction?: Transaction): Promise<T | null> {
        return this.model.findByPk(id, {transaction})
    }

    create(data: Partial<T['_creationAttributes']>, transaction?: Transaction): Promise<T> {
        return this.model.create(data as any, { transaction })
    }

    async update(id: string, data: Partial<T['_creationAttributes']>, transaction?: Transaction): Promise<T | null> {
        const record = await this.model.findByPk(id, { transaction })
        if (!record) return null
        return record.update(data as any, { transaction })
    }

    async delete(id: string, transaction?: Transaction): Promise<boolean> {
        const record = await this.model.findByPk(id, { transaction })
        if (!record) return false
        await record.destroy({ transaction })
        return true
    }
}

export default BaseRepository