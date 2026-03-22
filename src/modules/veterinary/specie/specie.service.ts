import { Op, Transaction } from "sequelize";
import BaseService from "../../../shared/utils/baseModels/baseService";
import Bone from "../bone/bone.model";
import Specie from "./specie.model";
import specieRepository from "./specie.repository";
import { SpecieCreationAttributes, SpecieWithBones } from "./specie.types";

class SpecieService extends BaseService<Specie> {
    constructor() {
        super(specieRepository)
    }
    
    async create(data: Partial<SpecieCreationAttributes>): Promise<Specie> {
        const findSpecie = await Specie.findOne({
            where: { [Op.or]: [
                {name: data.name},
                {scientificName: data.scientificName}
            ] }
        })
        if (findSpecie) {
            throw new Error('Espécie Já Cadastrada')
        }
        
        return this.repository.create(data)
    }

    async incrementTotalQuantity(specieId: string, quantityToAdd: number, transaction?: Transaction): Promise<Specie> {
        const findSpecie = await Specie.findByPk(specieId, { transaction })
        if (!findSpecie) throw new Error('Espécie não encontrada')
        
        await findSpecie.increment('totalQuantity', { by: quantityToAdd, transaction })

        return findSpecie
    }

    findAll(): Promise<SpecieWithBones[]> {
        return Specie.findAll({
            include: [
                {
                    model: Bone,
                    as: 'bones',
                    attributes: ['name']
                }
            ]
        }) as unknown as Promise<SpecieWithBones[]>
    }

    findById(id: string): Promise<SpecieWithBones | null> {
        return Specie.findByPk(id, {
            include: [
                 {
                    model: Bone,
                    as: 'bones',
                }
            ]
        }) as unknown as Promise<SpecieWithBones | null>
    }
}

export default new SpecieService()