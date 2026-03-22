import { DataTypes, Model,  } from "sequelize";
import sequelize from "../../../config/sequelize";
import { SpecieAttributes, SpecieCreationAttributes } from "./specie.types";
import {v4 as uuidv4} from 'uuid'

class Specie extends Model<SpecieAttributes,SpecieCreationAttributes> implements SpecieCreationAttributes {
    id!: string;
    name!: string;
    scientificName!: string;
    totalQuantity!: number;
    description!: string;
    active!: boolean;
}

Specie.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        scientificName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        totalQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'species',
        timestamps: true,
    }
)

export default Specie