import BaseRepository from "../../../shared/utils/baseModels/baseRepository";
import Specie from "./specie.model";

class SpecieRepository extends BaseRepository<Specie> {
    constructor() {
        super(Specie)
    }
}

export default new SpecieRepository()