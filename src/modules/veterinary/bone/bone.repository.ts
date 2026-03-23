import { Transaction } from "sequelize";
import BaseRepository from "../../../shared/utils/baseModels/baseRepository";
import Bone from "./bone.model";

export class BoneRepository extends BaseRepository<Bone> {
    constructor() {
        super(Bone)
    }

    async incrementQuantity(boneId: string, quantityToAdd: number, transaction?: Transaction): Promise<void> {
        const findBone = await this.findById(boneId, { transaction })

        if (!findBone) throw new Error('Osso não encontrado')

        await findBone.increment('quantity', {
            by: quantityToAdd,
            transaction,
        })

    }

}

export default new BoneRepository()