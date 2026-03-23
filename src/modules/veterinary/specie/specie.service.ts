import { Op, Transaction } from "sequelize";
import BaseService from "../../../shared/utils/baseModels/baseService";
import Bone from "../bone/bone.model";
import Specie from "./specie.model";
import specieRepository, { SpecieRepository } from "./specie.repository";
import { SpecieCreationAttributes, SpecieWithBones } from "./specie.types";
import sequelize from "../../../config/sequelize";

export class SpecieService extends BaseService<Specie, SpecieRepository> {
  constructor() {
    super(specieRepository);
  }

  async create(data: Partial<SpecieCreationAttributes>): Promise<Specie> {
    return sequelize.transaction(async (transaction) => {
      const findSpecie = await this.repository.findOne({
        where: {
          [Op.or]: [
            { name: data.name },
            { scientificName: data.scientificName },
          ],
        },
        transaction,
      });

      if (findSpecie) {
        throw new Error("Espécie Já Cadastrada");
      }

      return this.repository.create(data, { transaction });
    });
  }

  async incrementTotalQuantity(
    specieId: string,
    quantityToAdd: number,
    transaction?: Transaction,
  ): Promise<void> {
    await this.repository.incrementTotalQuantity(
      specieId,
      quantityToAdd,
      transaction,
    );
  }

  findAll(): Promise<SpecieWithBones[]> {
    return this.repository.findAll({
      include: [
        {
          model: Bone,
          as: "bones",
          attributes: ["name"],
        },
      ],
    }) as unknown as Promise<SpecieWithBones[]>;
  }

  findById(id: string): Promise<SpecieWithBones | null> {
    return this.repository.findById(id, {
      include: [
        {
          model: Bone,
          as: "bones",
        },
      ],
    }) as unknown as Promise<SpecieWithBones | null>;
  }
}

export default new SpecieService();
