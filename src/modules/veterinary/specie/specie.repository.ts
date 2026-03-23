import { Transaction } from "sequelize";
import BaseRepository from "../../../shared/utils/baseModels/baseRepository";
import Specie from "./specie.model";

export class SpecieRepository extends BaseRepository<Specie> {
    constructor() {
        super(Specie)
    }

    async incrementTotalQuantity(specieId: string, quantityToAdd: number, transaction?: Transaction): Promise<void> {
        const specie = await this.findById(specieId, { transaction })
        if (!specie) throw new Error('Espécie não encontrada')

            await specie.increment('totalQuantity', {
                by: quantityToAdd,
                transaction
            })

    }
}

export default new SpecieRepository()