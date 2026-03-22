import { BoneAttributes } from "../bone/bone.types";
import Specie from "./specie.model";

export interface SpecieAttributes {
    id: string,
    name: string,
    scientificName: string,
    totalQuantity: number,
    description: string,
    active: boolean,
}

export type SpecieCreationAttributes = Omit<SpecieAttributes, 'id' | 'active'>

export interface SpecieWithBones extends Specie {
    bones: BoneAttributes[]
}