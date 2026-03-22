import BaseController from "../../../shared/utils/baseModels/baseController";
import Specie from "./specie.model";
import specieService from "./specie.service";

class SpecieController extends BaseController<Specie> {
    constructor() {
        super(specieService)
    }
}

export default new SpecieController()