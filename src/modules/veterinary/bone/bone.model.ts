import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/sequelize";
import { BoneAttributes, BoneCreationAttributes } from "./bone.types";
import {v4 as uuidv4} from 'uuid'


class Bone extends Model<BoneAttributes, BoneCreationAttributes> implements BoneCreationAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public quantity!: number;
    public specieId!: string;
    public active!: boolean;
}

Bone.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        specieId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'species',
                key: 'id'
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'bones',
        timestamps: true
    }
)

export default Bone