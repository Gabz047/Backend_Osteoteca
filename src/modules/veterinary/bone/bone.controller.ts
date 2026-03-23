import BaseController from "../../../shared/utils/baseModels/baseController";
import boneService, { BoneService } from "./bone.service";
import Bone from "./bone.model";
import { Request, Response } from "express";
class BoneController extends BaseController<Bone, BoneService> {
    constructor() {
        super(boneService)

        this.router.post('/:id/increment', this.incrementQuantity)
    }

    incrementQuantity = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { quantity } = req.body
            const { id } = req.params as {id: string}

            await this.service.incrementQuantity(id, quantity)

            return res.status(204).send()

        } catch (error: any) {
            return res.status(500).json({error: error.message})
        }
    }

}

export default new BoneController()