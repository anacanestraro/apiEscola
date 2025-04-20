import {Model, DataTypes} from "sequelize";
import {sequelize} from "../instances/mysql";
import {Aluno} from "./Aluno";
import {Disciplina} from "./Disciplina";

export class Nota extends Model {
    public id!: number;
    public alunoId!: number;
    public disciplinaId!: number;
    public nota!: number;
    public dataAvaliacao!: Date;
}

Nota.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    alunoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    disciplinaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Disciplina,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    nota: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    dataAvaliacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    sequelize,
    tableName: "notas",
    timestamps: true,
    paranoid: true
});