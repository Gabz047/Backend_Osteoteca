import BaseController from "../../../shared/utils/baseModels/baseController";
import boneService from "./bone.service";
import Bone from "./bone.model";

class BoneController extends BaseController<Bone> {
    constructor() {
        super(boneService)
    }

}

export default new BoneController()