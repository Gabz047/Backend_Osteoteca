import { SpecieAttributes } from "../specie/specie.types"
import Bone from "./bone.model"

export interface BoneAttributes {
    id: string,
    name: string,
    description: string,
    quantity: number,
    specieId: string,
    active: boolean,
}

export type BoneCreationAttributes = Omit<BoneAttributes, 'id' | 'active'>

export interface BoneWithSpecie extends Bone {
    specie: SpecieAttributes
}
