import {Model, DataTypes} from "sequelize";
import { sequelize } from "../instances/mysql";
import { Curso } from "./Curso";

export class Turma extends Model {
    public id!: number;
    public nome!: string;
    public periodo!: string;
    public cursoId!: number;
}

Turma.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Curso,
                key: "id",
            },
            onDelete: "CASCADE",
        }
    },
    {
        sequelize,
        tableName: "turmas",
        paranoid: true,
        timestamps: true,
    }

);