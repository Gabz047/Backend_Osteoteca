import BaseRepository from "../../../shared/utils/baseModels/baseRepository";
import Bone from "./bone.model";

class BoneRepository extends BaseRepository<Bone> {
    constructor() {
        super(Bone)
    }
}

export default new BoneRepository()