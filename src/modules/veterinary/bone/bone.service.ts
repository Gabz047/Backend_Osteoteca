import sequelize from "../../../config/sequelize";
import BaseService from "../../../shared/utils/baseModels/baseService";
import Specie from "../specie/specie.model";
import specieService from "../specie/specie.service";
import Bone from "./bone.model";
import boneRepository from "./bone.repository";
import { BoneCreationAttributes, BoneWithSpecie } from "./bone.types";

class BoneService extends BaseService<Bone> {
  constructor() {
    super(boneRepository);
  }

  async create(data: Partial<BoneCreationAttributes>): Promise<Bone> {
    if (!data.specieId) {
      throw new Error("SpecieId é obrigatório");
    }

    return sequelize.transaction(async (transaction) => {
      const specie = await Specie.findByPk(data.specieId, { transaction });

      if (!specie) {
        throw new Error("Espécie não encontrada");
      }

      await specieService.incrementTotalQuantity(specie.id, (data.quantity || 0) , transaction);

      const bone = await this.repository.create(data, { transaction });


      return bone;
    });
  }

  findAll(): Promise<BoneWithSpecie[]> {
    return Bone.findAll({
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
    return Bone.findByPk(id, {
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
