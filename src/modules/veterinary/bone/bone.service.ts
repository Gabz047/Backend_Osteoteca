import { Op } from "sequelize";
import sequelize from "../../../config/sequelize";
import BaseService from "../../../shared/utils/baseModels/baseService";
import Specie from "../specie/specie.model";
import specieService from "../specie/specie.service";
import Bone from "./bone.model";
import boneRepository, { BoneRepository } from "./bone.repository";
import { BoneCreationAttributes, BoneWithSpecie } from "./bone.types";
export class BoneService extends BaseService<Bone, BoneRepository> {
  constructor() {
    super(boneRepository);
  }

  async create(data: Partial<BoneCreationAttributes>): Promise<Bone> {
    const specieId = data.specieId
    if (!specieId) throw new Error("SpecieId é obrigatório");
    

    return sequelize.transaction(async (transaction) => {
      const alreadyExistsWithSpecifications = await this.repository.findOne({where: {
        name: data.name,
        specieId: specieId,
      },
      transaction
    })

      if (alreadyExistsWithSpecifications) throw new Error('Osso com este nome já existe para esta espécie')

      await specieService.incrementTotalQuantity(specieId, (data.quantity || 0) , transaction);

      const bone = await this.repository.create(data, { transaction });


      return bone;
    });
  }

  async incrementQuantity(boneId: string, quantityToAdd: number): Promise<void> {
    if (!boneId) throw new Error("BoneId é obrigatório")

      const quantity = Number(quantityToAdd)
      if (!quantity || quantity <= 0) throw new Error('Quantidade deve ser maior que zero')

       await this.repository.incrementQuantity(boneId, quantityToAdd)

  }

  findAll(): Promise<BoneWithSpecie[]> {
    return this.repository.findAll({
      include: [
        {
          model: Specie,
          as: "specie",
          attributes: ["name"],
        },
      ],
    }) as unknown as Promise<BoneWithSpecie[]>;
  }

  findById(id: string): Promise<BoneWithSpecie | null> {
    return this.repository.findById(id, {
      include: [
        {
          model: Specie,
          as: "specie",
        },
      ],
    }) as unknown as Promise<BoneWithSpecie | null>;
  }
}

export default new BoneService();
