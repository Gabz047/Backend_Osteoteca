import BaseService from "../../../shared/utils/baseModels/baseService";
import Specie from "../specie/specie.model";
import specieService from "../specie/specie.service";
import Bone from "./bone.model";
import boneRepository from "./bone.repository";
import { BoneCreationAttributes, BoneWithSpecie } from "./bone.types";

class BoneService extends BaseService<Bone> {
    constructor() {
        super(boneRepository)
    }

    async create(data: Partial<BoneCreationAttributes>): Promise<Bone> {
        const findSpecie = await Specie.findByPk(data.specieId)

        if (!data.specieId) {
            throw new Error('SpecieId é obrigatório')
        }

        if (findSpecie) {
            specieService.incrementTotalQuantity(data.specieId)   
        }

        return this.repository.create(data)

    }

    findAll(): Promise<BoneWithSpecie[]> {
        return Bone.findAll({
            include: [
                  {
                    model: Specie,
                    as: 'specie',
                    attributes: ['name']
                }
            ]
        }) as unknown as Promise<BoneWithSpecie[]>
    }

    findById(id: string): Promise<BoneWithSpecie | null> {
        return Bone.findByPk(id, {
            include: [
                {
                    model: Specie,
                    as: 'specie',
                }
            ]
        }) as unknown as Promise<BoneWithSpecie | null>
    }
}

export default new BoneService()