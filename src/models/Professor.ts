import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Professor extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public matricula!: string; 
}

Professor.init(
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
          email: {
            type: DataTypes.STRING,
            unique: true, 
            allowNull: false,
          },
          senha: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          matricula: {
            type: DataTypes.STRING,
            unique: true, 
            allowNull: false,
          }
    },
    {
        sequelize, 
        tableName: "alunos", 
        paranoid:true,
        timestamps: true
    }
);