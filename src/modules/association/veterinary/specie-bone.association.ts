import Specie from "../../veterinary/specie/specie.model";
import Bone from "../../veterinary/bone/bone.model";

Specie.hasMany(Bone, {foreignKey: 'specieId', as: 'bones'})

Bone.belongsTo(Specie, {foreignKey: 'specieId', as: 'specie'})