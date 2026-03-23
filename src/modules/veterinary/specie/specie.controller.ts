import BaseController from "../../../shared/utils/baseModels/baseController";
import Specie from "./specie.model";
import specieService, { SpecieService } from "./specie.service";

class SpecieController extends BaseController<Specie, SpecieService> {
    constructor() {
        super(specieService)
    }
}

export default new SpecieController()