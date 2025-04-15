import {Model, DataTypes} from "sequelize";
import {sequelize} from "../instances/mysql";

export class Curso extends Model {
    public id!: number;
    public nome!: string;
    public descricao!: string;
}

Curso.init(
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
        descricao: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: "cursos",
        paranoid: true,
        timestamps:true,
    }
);